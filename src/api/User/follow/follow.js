import { prisma } from "../../../../generated/prisma-client";

export default {
	Mutation: {
		follow: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;
			if (id != user.id) {
				try {
					await prisma.updateUser({
						where: { id: user.id },
						data: {
							following: {
								connect: {
									id,
								},
							},
						},
					});
					return true;
				} catch {
					return false;
				}
			} else {
				throw Error("You can't follow yourself.");
			}
		},
	},
};
