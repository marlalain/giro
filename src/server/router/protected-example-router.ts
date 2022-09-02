import {createProtectedRouter} from "./protected-router";
import {z} from "zod";

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedExampleRouter = createProtectedRouter()
	.query("getSession", {
		resolve({ctx}) {
			return ctx.session;
		},
	})
	.query("getSecretMessage", {
		resolve({ctx}) {
			return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
		},
	})
	.query("wasInvited", {
		async resolve({ctx}) {
			return await ctx.prisma.user.findUnique({
				where: {id: ctx.session.user.id},
			}).inviteToken();
		}
	})
	.mutation("acceptInvite", {
		input: z.string().min(10),
		async resolve({ctx, input}) {
			const inviteToken = await ctx.prisma.inviteToken.findUnique({
				where: {id: input},
			});

			if (!inviteToken || inviteToken.userId) {
				throw new Error("Invalid invite token");
			}

			await ctx.prisma.user.update({
				where: {id: ctx.session.user.id},
				data: {
					inviteToken: {
						connect: {id: input},
					}
				},
			});
		}
	});
