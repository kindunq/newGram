import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const { username, email, firstName = '', lastName = '', bio = '' } = args;
			const exists = await prisma.$exists.user({
				OR: [
					{
						username
					},
					{ email }
				]
			});
			if (exists) {
				throw Error('이름 / 이메일이 사용중입니다.');
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
