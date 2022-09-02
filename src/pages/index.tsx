import type {NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button, Text} from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
	const {data: session} = useSession();

	if (session && session.user) {
		return <>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app"/>
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
					Signed in as {session.user.name} <br/>
				</Text>

				<Link href={'/projects'}>
					<Button my={5}>Projects</Button>
				</Link>

				<Button onClick={() => signOut()}>Sign out</Button>
			</main>
		</>;
	}

	return <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
		<Text py={5}>
			Not signed in <br/>
		</Text>
		<Button onClick={() => signIn()}>Sign in</Button>
	</main>
};

export default Home;
