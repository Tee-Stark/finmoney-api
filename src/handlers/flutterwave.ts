// import Flutterwave from 'flutterwave-node-v3';
import { FLW_API_URL, FLW_SEC_KEY, FLW_WBHK_HASH } from '../config/constants';
import axios from 'axios';
import logger from '../config/logger';
// const flw = new Flutterwave(FLW_PUB_KEY, FLW_SEC_KEY);

type Acct = {
  status: string;
  message: string;
  data: any;
};

const generateAccountNo = async (acct: any) => {
  try {
    const acctDetails: Acct = await axios
      .post(
        `${FLW_API_URL}/virtual-account-numbers`,
        {
          email: <string>acct.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${FLW_SEC_KEY}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((err: any) => {
        logger.error(err.message);
        throw new Error(err);
      });

    logger.info(acctDetails);
    return acctDetails.status === 'success' ? acctDetails.data : null;
  } catch (err: any) {
    logger.fatal(err.message);
    throw new Error(err);
  }
};

// const fundAcct = async (payload: any) => {
//   try {
//   } catch (err) {
//     logger.error(err.message);
//     throw new Error(err);
//   }
// };

export const verifyWebhook = (req: any, res: any) => {
  const signature = req.headers['verif-hash'];

  logger.info(req.body);

  if (!signature || signature !== FLW_WBHK_HASH) {
    logger.warn('Something fishy 🐟  might be going on...');
    return res.status(401).end();
  }
  logger.info('Successfully verified webhook request');
  return res.status(200).end();
};

export default {
  generateAccountNo,
};
