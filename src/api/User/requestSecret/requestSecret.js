import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		requestSecret: async (_, args, { request }) => {
			const { email } = args;
			const loginSecret = generateSecret();
			const existEmail = await prisma.$exists.user({ email: email });
			if (!existEmail) {
				throw Error('계정이 존재 하지 않습니다.');
				//return false;
			}

			await sendSecretMail(email, loginSecret);
			await prisma.updateUser({ data: { loginSecret }, where: { email } });
			return true;
		}
	}
};
