// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { protectedExampleRouter } from './protected-example-router';
import { projectRouter } from './project';
import { deadlineRouter } from './deadline';
import { taskRouter } from './task';
import { onboardRouter } from './onboard';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('auth.', protectedExampleRouter)
	.merge('project.', projectRouter)
	.merge('deadline.', deadlineRouter)
	.merge('task.', taskRouter)
	.merge('onboard.', onboardRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
