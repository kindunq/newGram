import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const { username, email, firstName = '', lastName = '', bio = '' } = args;
			const existName = await prisma.$exists.user({ username: username });
			const existEmail = await prisma.$exists.user({ email: email });
			if (existName) {
				throw Error('같은 이름의 사용자가 존재합니다.');
			}
			if (existEmail) {
				throw Error('같은 이름의 이메일이 존재합니다.');
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
