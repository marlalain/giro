import {NextPage} from "next";
import ProjectInput from "../components/projects/project-input";

const Projects: NextPage = () => {
	return (
		<>
			<ProjectInput/>

			<main className={'flex flex-col items-center justify-center mt-12'}>
			</main>
		</>
	)
}

export default Projects;
