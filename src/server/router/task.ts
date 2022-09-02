import {createProtectedRouter} from "./protected-router";
import {z} from "zod";

export const taskRouter = createProtectedRouter()
	.mutation("create", {
		input: z.object({
			title: z.string(),
			description: z.string().nullish(),
			projectId: z.string(),
			deadlineId: z.string(),
		}),
		resolve({ctx, input}) {
			return ctx.prisma.task.create({
				data: {
					title: input.title,
					description: input.description,
					userId: ctx.session.user.id,
					projectId: input.projectId,
					deadlineId: input.deadlineId,
				}
			})
		}
	})
	.query("getTasks", {
		resolve({ctx}) {
			return ctx.prisma.task.findMany({
				where: {
					userId: ctx.session.user.id,
				}
			});
		}
	});
