import {NextPage} from "next";
import ProjectTable from "../components/projects/project-table";
import ProjectInput from "../components/projects/project-input";

const Projects: NextPage = () => {
	return (
		<>
			<ProjectInput/>
			
			<main className={'flex flex-col items-center justify-center mt-12'}>
				<ProjectTable/>
			</main>
		</>
	)
}

export default Projects;
