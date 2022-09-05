import Head from 'next/head';

type Props = {
	title?: string;
	description?: string;
	url?: string;
	twitterCreator?: string;
	twitterSite?: string;
};

const CustomHead = ({
	title = 'giro',
	description = 'giro is a productivity tool for neurodivergent people',
	url = 'https://giro.app',
	twitterCreator = '@alexwillmakeit',
	twitterSite = '@girodotapp',
}: Props) => (
	<Head>
		<title>{title}</title>
		<meta name="title" content={title} />
		<meta name="description" content={description} />

		<meta property="og:type" content="website" />
		<meta property="og:url" content={url} />

		<meta name="twitter:card" content="summary" />
		<meta name="twitter:site" content={twitterSite} />
		<meta name="twitter:creator" content={twitterCreator} />
		<meta name="twitter:title" content={title} />
		<meta name="og:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="og:description" content={description} />

		<link rel="icon" href="/favicon.ico" />
	</Head>
);

export default CustomHead;
