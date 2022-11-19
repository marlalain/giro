import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const onboardRouter = createProtectedRouter().mutation('welcome', {
	input: z.object({
		project: z.object({
			title: z.string(),
			description: z.string(),
		}),
		deadline: z.object({
			description: z.string(),
			date: z.date(),
		}),
		task: z.object({
			title: z.string(),
			description: z.string(),
		}),
	}),
	async resolve({ ctx, input }) {
		const userId = ctx.session.user.id;

		const project = await ctx.prisma.project.create({
			data: {
				...input.project,
				userId,
			},
		});

		const deadline = await ctx.prisma.deadline.create({
			data: {
				...input.deadline,
				userId,
				projectId: project.id,
			},
		});

		const task = await ctx.prisma.task.create({
			data: {
				...input.task,
				userId,
				deadlineId: deadline.id,
			},
		});
	},
});
