import type {NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";
import {Box, Button, Input, Text} from "@chakra-ui/react";
import Link from "next/link";
import {trpc} from "../utils/trpc";
import {useState} from "react";

const Home: NextPage = () => {
	const {data: session} = useSession();
	const [code, setCode] = useState("");
	const wasInvited = trpc.useQuery(["auth.wasInvited"]);
	const acceptInvite = trpc.useMutation("auth.acceptInvite");

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

				<Text py={5}>
					signed in as {session.user.name} <br/>
				</Text>

				{
					wasInvited.data?.userId === session.user.id
					? <Link href={'/projects'}>
						<Button my={5}>projects</Button>
					</Link>
					: (
						<Box mb={5}>
							<Input
								placeholder="invite code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleInvite();
								}}/>
						</Box>
					)
				}

				<Button onClick={() => signOut()}>sign out</Button>
			</main>
		</>;
	}

	return <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
		<Button variant={"outline"} onClick={() => signIn('discord')}>Sign in</Button>
	</main>
};

export default Home;
