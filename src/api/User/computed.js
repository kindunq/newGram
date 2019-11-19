import { prisma } from "../../../generated/prisma-client";

export default {
	User: {
		fullName: (parent) => {
			return `${parent.firstName} ${parent.lastName}`;
		},
		amIFollowing: async (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			try {
				return prisma.$exists.user({
					AND: [{ id: user.id }, { following_some: { id: parentId } }],
				});
			} catch {
				return false;
			}
		},
		itsMe: (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			console.log(parentId);
			return user.id === parentId;
		},
	},
};
