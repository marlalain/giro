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
	.query("isVerified", {
		input: z.string().cuid().nullish(),
		async resolve({ctx, input}) {
			if (!input) {
				throw new Error("User not found");
			}

			const user = await ctx.prisma.user.findUnique({
				where: {
					id: input,
				},
			});

			if (!user) {
				throw new Error("User not found");
			}

			return user.verified;
		}
	})
