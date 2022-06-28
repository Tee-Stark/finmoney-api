import { User } from '@prisma/client';
import prisma from '../../prisma/prisma';
import bcrypt from 'bcryptjs';

const CreateUser = async (user: User, accountNo: number) => {
  try {
    const hashedPassword = bcrypt.hashSync(user.password, 12);

    user.password = hashedPassword;
    // const newUser = await prisma.user.create({
    //   data: {
    //     ...user,
    //     account: {
    //       create: {s
    //         accountNo,
    //       },
    //     },
    //   },
    // })
    const created = await prisma.account.create({
      data: {
        accountNo,
        user: {
          connectOrCreate: {
            where: {
              email: user.email,
            },
            create: {
              ...user,
            },
          },
        },
      },
    });

    return created;
  } catch (err: any) {
    throw new Error(err);
  }
};

type UserLogin = {
  email: string;
  password: string;
};

const UserAuth = async (user: UserLogin) => {
  try {
    const userExists = await prisma.user.findFirst({
      where: { email: user.email },
      include: { account: true },
    });

    if (userExists === null || !bcrypt.compareSync(user.password, userExists.password)) {
      throw 'Invalid username or password';
    }
    return userExists;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default {
  CreateUser,
  UserAuth,
};
