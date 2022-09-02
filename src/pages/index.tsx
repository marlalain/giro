import type {NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button, Text} from "@chakra-ui/react";
import Link from "next/link";
import {trpc} from "../utils/trpc";

const Home: NextPage = () => {
	const {data: session} = useSession();
	const isVerified = trpc.useQuery(["auth.isVerified", session?.user?.id]);

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

				{!isVerified.isLoading && isVerified.data
				 ? <Link href={'/projects'}>
					 <Button my={5}>projects</Button>
				 </Link>
				 : null}


				<Button onClick={() => signOut()}>sign out</Button>
			</main>
		</>;
	}

	return <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
		<Button variant={"outline"} onClick={() => signIn('discord')}>Sign in</Button>
	</main>
};

export default Home;
