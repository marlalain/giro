import {NextPage} from "next";

const steps = [
	{
		name: "creating a project",
		status: 'current',
	},
	{
		name: "creating a deadline",
		status: 'upcoming',
	},
	{
		name: "creating tasks",
		status: 'upcoming',
	},
];

const Welcome: NextPage = () => {
	return (
		<>
			<nav aria-label="Progress">
				<ol role="list" className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
					{steps.map((step, stepIdx) => (
						<li key={step.name} className="relative md:flex-1 md:flex">
							{step.status === 'complete' ? (
								<a href={step.}
							)}
						</li>))}
				</ol>
			</nav>
		</>
	)
}

export default Welcome;
