import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const { username, email, firstName = '', lastName = '', bio = '' } = args;
			const exist = await prisma.$exists.user({
				OR: [{ username: username }, { email: email }]
			});

			if (exist) {
				//throw Error('이름 / 이메일이 사용중입니다.');
				return false;
			}

			await prisma.createUser({
				username,
				email,
				firstName,
				lastName,
				bio
			});
			return true;
		}
	}
};
