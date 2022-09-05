import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CustomHead from '../components/custom-head';
import Button from '../components/button';

const Home: NextPage = () => {
	const { data: session } = useSession();
	const [code, setCode] = useState('');
	const wasInvited = trpc.useQuery(['auth.wasInvited']);
	const acceptInvite = trpc.useMutation('auth.acceptInvite');
	const router = useRouter();

	const handleInvite = () => {
		acceptInvite.mutateAsync(code).then(() => window.location.reload());
	};

	if (session && session.user) {
		return (
			<>
				<CustomHead />

				<main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
					{session.user.image ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={session.user.image}
							alt={session.user.name || 'discord user'}
							className="mb-2 h-32 w-32 rounded-full"
						/>
					) : null}

					<p className="p-5">
						signed in as {session.user.name} <br />
					</p>

					{wasInvited.data?.userId === session.user.id ? (
						<Button className="mb-3" onClick={() => router.push('/welcome')}>
							onboard now
						</Button>
					) : (
						<div placeholder="pb-5">
							<input
								className="mb-3 rounded-md border-2 border-gray-300 bg-white p-2 hover:border-blue-300 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-50 dark:placeholder:text-gray-50"
								placeholder="invite code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') handleInvite();
								}}
							/>
						</div>
					)}

					<Button onClick={() => signOut()}>sign out</Button>
				</main>
			</>
		);
	}

	return (
		<>
			<CustomHead />

			<main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
				<h2 className="mb-2 text-lg">giro</h2>
				<Button onClick={() => signIn('discord')}>sign in</Button>
			</main>
		</>
	);
};

export default Home;
