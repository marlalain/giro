import {Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {Project} from "@prisma/client";
import {trpc} from "../../utils/trpc";

const ProjectTable = () => {
	const projects = trpc.useQuery(['project.getProjects']);

	if (projects.isLoading || !projects.data) return (
		<main className={'flex flex-col items-center justify-center'}>
			Loading...
		</main>
	)

	return (
		<TableContainer>
			<Table variant={"simple"}>
				<TableCaption placement={'bottom'}>projects appear here</TableCaption>

				<Thead>
					<Tr>
						<Th>title</Th>
						<Th>status</Th>
						<Th>created at</Th>
						<Th>last update</Th>
					</Tr>
				</Thead>

				<Tbody>
					{projects.data.map((project: Project) => (
						<Tr key={project.id}>
							<Td>{project.title}</Td>
							<Td>-</Td>
							<Td>{project.createdAt.toLocaleDateString()}</Td>
							<Td>{project.updatedAt?.toLocaleDateString()}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default ProjectTable;
