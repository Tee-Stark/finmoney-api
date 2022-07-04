import prisma from '../../prisma/prisma';

const UpdateAccBal = async (email: string, amount: number) => {
  try {
    const userValid = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userValid) {
      throw Error("I think you've got the wrong user");
    }

    const updatedAcc = prisma.account.update({
      where: {
        id: <number | undefined>userValid.accountId,
      },
      data: {
        accountBalance: {
          increment: amount,
        },
      },
    });

    return updatedAcc;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default {
  UpdateAccBal,
};
