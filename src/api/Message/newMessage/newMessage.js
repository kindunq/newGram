import { subscribe } from "graphql/subscription";
import { prisma } from "../../../../generated/prisma-client";

const CREATED = "CREATED";

export default {
	Subscription: {
		newMessage: {
			subscribe: (_, args) => {
				const { roomId } = args;
				return prisma.$subscribe
					.message({
						AND: [
							{ mutation_in: CREATED },
							{
								node: {
									room: { id: roomId },
								},
							},
						],
					})
					.node();
			},
			resolve: (payload) => payload,
		},
	},
};
