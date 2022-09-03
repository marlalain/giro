import type {NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";
import {trpc} from "../utils/trpc";
import {useState} from "react";
import {useRouter} from "next/router";

const Home: NextPage = () => {
	const {data: session} = useSession();
	const [code, setCode] = useState("");
	const wasInvited = trpc.useQuery(["auth.wasInvited"]);
	const acceptInvite = trpc.useMutation("auth.acceptInvite");
	const router = useRouter();

	const handleInvite = () => {
		acceptInvite.mutateAsync(code)
			.then(() => window.location.reload());
	}

	if (session && session.user) {
		return <>
			<Head>
				<title>giro</title>
				<meta name="description" content="giro is a productivity tool for neurodivergent people."/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
				{session.user.image
					// eslint-disable-next-line @next/next/no-img-element
				 ? <img
					 src={session.user.image}
					 alt={session.user.name || "discord user"}
					 className="rounded-full w-32 h-32 mb-2"/>
				 : null
				}

				<p className="p-5">
					signed in as {session.user.name} <br/>
				</p>

				{
					wasInvited.data?.userId === session.user.id
					? <button
						className="py-5 rounded-md border px-4 py-1"
						onClick={() => router.push("/projects")}>projects</button>
					: (
						<div placeholder="pb-5">
							<input
								placeholder="invite code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleInvite();
								}}/>
						</div>
					)
				}

				<button className="mt-5 rounded-md border px-4 py-1" onClick={() => signOut()}>sign out</button>
			</main>
		</>;
	}

	return <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
		<h2 className="text-lg mb-2">giro</h2>
		<button className="rounded-md border px-4 py-1" onClick={() => signIn('discord')}>Sign in</button>
	</main>
};

export default Home;
