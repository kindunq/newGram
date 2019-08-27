import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
	Mutation: {
		unfollow: async (_, args, { request }) => {
			isAuthenticated(request);
			const { id } = args; // 언팔할사람
			const { user } = request; // 나
			try {
				await prisma.updateUser({
					where: { id: user.id },
					data: {
						following: {
							disconnect: {
								id,
							},
						},
					},
				});
				return true;
			} catch {
				return false;
			}
		},
	},
};
