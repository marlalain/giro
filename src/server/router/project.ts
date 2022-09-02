import {z} from "zod";
import {createProtectedRouter} from "./protected-router";

export const projectRouter = createProtectedRouter()
	.mutation("create", {
		input: z.object({
			title: z.string().min(1),
			description: z.string().nullish(),
		}),
		async resolve({ctx, input}) {
			return await ctx.prisma.project.create({
				data: {
					title: input.title,
					description: input.description,
					userId: ctx.session.user.id,
				}
			})
		}
	})
	.query("getProjects", {
		async resolve({ctx}) {
			return await ctx.prisma.project.findMany({
				where: {
					userId: ctx.session.user.id,
				}
			});
		}
	});
