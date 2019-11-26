import { prisma } from "../../../generated/prisma-client";

export default {
	Message: {
		room: ({ id }) => prisma.room({ id }),
		from: ({ id }) => prisma.message({ id }).from(),
		to: ({ id }) => prisma.message({ id }).to(),
	},
};
