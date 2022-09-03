import type {NextPage} from "next";
import {signIn, signOut, useSession} from "next-auth/react";
import {trpc} from "../utils/trpc";
import {useState} from "react";
import {useRouter} from "next/router";
import CustomHead from "../components/custom-head";
import Button from "../components/button";

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
			<CustomHead/>

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
					? <Button className="mb-3" onClick={() => router.push("/projects")}>projects</Button>
					: (
						<div placeholder="pb-5">
							<input
								className="bg-white dark:bg-gray-700 dark:text-gray-50 dark:placeholder-gray-50 border-2 border-gray-300 mb-3 px-2 py-2 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-300"
								placeholder="invite code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleInvite();
								}}/>
						</div>
					)
				}

				<Button onClick={() => signOut()}>sign out</Button>
			</main>
		</>;
	}

	return <>
		<CustomHead/>

		<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
			<h2 className="text-lg mb-2">giro</h2>
			<Button onClick={() => signIn('discord')}>
				sign in
			</Button>
		</main>
	</>;
};

export default Home;
