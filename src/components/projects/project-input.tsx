import {NextComponentType} from "next";
import {trpc} from "../../utils/trpc";
import {useReducer} from "react";
import {formReducer} from "../../utils/formUtils";

const ProjectCreation: NextComponentType = () => {
	const create = trpc.useMutation(['project.create']);
	const [form, setForm] = useReducer(formReducer, {});

	return (
		<div className="flex flex-col items-center justify-center bg-gray-50 py-10">
			<h2 className="text-lg mb-5">new project</h2>

			<div className="flex flex-col items-center justify-center">
				<input
					className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-500 hover:border-purple-300"
					placeholder="project name"
					onChange={(e) => setForm({name: e.target.value})}
				/>
			</div>
		</div>
	)
}

export default ProjectCreation;
