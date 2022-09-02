import {z} from "zod";
import {createProtectedRouter} from "./protected-router";

export const deadlineRouter = createProtectedRouter()
	.mutation("create", {
		input: z.object({
			title: z.string(),
			description: z.string().nullish(),
			projectId: z.string(),
			date: z.date(),
		}),
		async resolve({ctx, input}) {
			return await ctx.prisma.deadline.create({
				data: {
					title: input.title,
					description: input.description,
					userId: ctx.session.user.id,
					projectId: input.projectId,
					date: input.date,
				}
			})
		}
	})
