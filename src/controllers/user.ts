import userService from '../services/userService';
import logger from '../config/logger';
import flutterwave from '../handlers/flutterwave';

export const CreateUser = async (req: any, res: any) => {
  try {
    // const { email, name, password } = req.body;
    const userDetails: any = req.body;

    // generate an account that can be used to fund user account;
    const virtAcct: any = await flutterwave.generateAccountNo({ email: userDetails.email });

    logger.info(virtAcct);
    if (!virtAcct) {
      throw Error('unable to generate virtual account at this time');
    }
    const accNo: number = parseInt(<string>virtAcct.account_number);
    const newUser = await userService.CreateUser({ ...userDetails }, accNo);

    if (!newUser) {
      throw Error('something went wrong internally');
    }
    logger.info(newUser);
    return res.status(201).json({
      message: 'successfully created user',
      data: newUser,
    });
  } catch (err: any) {
    logger.fatal(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const LoginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await userService.UserAuth({ email, password });

    logger.info(user);
    if (!user) {
      return res.status(401).json({
        error: 'invalid username or password',
      });
    }
    // add authentication here
    return res.status(200).json({
      message: 'successfully authenticated user',
      data: user,
    });
  } catch (err: any) {
    logger.fatal(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};
