import {NextPage} from "next";
import CustomHead from "../components/custom-head";
import {useReducer} from "react";
import {formReducer} from "../utils/formUtils";
import Button from "../components/button";
import SimpleCalendar from "../components/calendars/simple-calendar";

type InputGroupProps = {
	name: string;
	text?: string;
	placeholder?: string;
	textarea?: boolean;
	onChange: (e: any) => void;
}

const InputGroup = ({name, text, placeholder, onChange, textarea}: InputGroupProps) => <div
	className="col-span-3">
	<label htmlFor={name} className="block text-sm font-medium text-gray-700">
		{text || name}
	</label>
	<div className="mt-2">
		{textarea
		 ? <textarea
			 id={name}
			 name={name}
			 rows={3}
			 className="block w-full flex-1 rounded-md border border-gray-300 hover:border-pink-300 focus:border-pink-500"
			 placeholder={placeholder || name}
		 />
		 : <input
			 className="block w-full flex-1 rounded-md border border-gray-300 hover:border-pink-300 focus:border-pink-500"
			 placeholder={placeholder || name}
			 type="text"
			 name={name}
			 id={name}
			 onChange={onChange}/>}
	</div>
</div>

type OnboardSectionProps = {
	name: string;
	description: string;
	children: any;
}

function OnboardSection({name, description, children}: OnboardSectionProps) {
	return <div className="md:grid md:grid-cols-4 md:gap-6">
		<div className="md:col-span-1">
			<div className="px-4 sm:px-0 mt-12 md:mt-0">
				<h3 className="text-lg font-medium leading-6 text-gray-700">{name}</h3>
				<p className="mt-1 text-md text-gray-600">
					{description}
				</p>
			</div>
		</div>

		<div className="hidden lg:block lg:col-span-1"></div>

		<div className="mt-5 md:col-span-3 lg:col-span-2 md:mt-0">
			<div className="border shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
					<div className="grid grid-cols-3 gap-6">
						{children}
					</div>
				</div>
			</div>
		</div>
	</div>;
}

function Divider() {
	return <div className="hidden sm:block" aria-hidden="true">
		<div className="pt-8 pb-5">
			<div className="border-t border-gray-200"/>
		</div>
	</div>;
}

const Welcome: NextPage = () => {
	const [form, setForm] = useReducer(formReducer, {});

	return (
		<>
			<CustomHead/>

			<div className="sm:w-full md:w-10/12 lg:w-8/12 my-10 mx-auto border rounded-md pt-8 bg-white">
				<div className="px-8 mb-6">
					<h2 className="text-xl font-medium text-center leading-3 text-gray-600 mb-2">
						welcome to giro!
					</h2>

					<p className="text-md text-center text-gray-600">
						it's nice having you here. let's learn how to configure your homepage first. <br/>
						and don't worry: you can create more projects, deadlines, and tasks later
					</p>

					<Divider/>

					<OnboardSection name="project" description="a project is a major goal that you want to achieve">
						<InputGroup
							name={"projectTitle"}
							text={"title"}
							placeholder={"learn a new language"}
							onChange={(e: any) => setForm({projectTitle: e.target.value})}/>
						<InputGroup
							textarea
							name={"projectDescription"}
							text={"description"}
							placeholder={"always wanted to learn french"}
							onChange={(e: any) => setForm({projectDescription: e.target.value})}/>
					</OnboardSection>

					<Divider/>

					<OnboardSection name="deadline"
					                description="a deadline is a date that you want to achieve your tasks by">
						<SimpleCalendar/>

						<div className="col-span-3 flex justify-center items-center">
							<div className="mt-1 flex rounded-md shadow-sm mx-10">
								<label
									htmlFor="deadlineHour"
									className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
									hour
								</label>

								<input
									id="deadlineHour"
									name="deadlineHour"
									className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-800 sm:text-sm border-gray-300"
									placeholder="15"
									type="number"/>
							</div>

							<div className="mt-1 flex rounded-md shadow-sm mr-10">
								<label
									htmlFor="deadlineMinute"
									className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
									minute
								</label>

								<input
									id="deadlineMinute"
									name="deadlineMinute"
									className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-800 sm:text-sm border-gray-300"
									placeholder="00"
									type="number"/>
							</div>
						</div>

					</OnboardSection>

					<Divider/>

					<OnboardSection name="task" description="simple tasks">
						<InputGroup
							name="taskTitle"
							text="title"
							placeholder="learn ten words"
							onChange={(e: any) => setForm({taskTitle: e.target.value})}/>
						<InputGroup
							textarea
							name="taskDescription"
							text="description"
							placeholder="ten words a day keep the bird away"
							onChange={(e: any) => setForm({taskDescription: e.target.value})}/>
					</OnboardSection>

					<Divider/>

					<p className="text-md text-center text-gray-600 mt-12 md:mt-0">
						one project can have many deadlines and a deadline can have many tasks
					</p>

				</div>

				<div className="text-right w-full">
					<Button className="mr-8 mb-6">
						next
					</Button>
				</div>
			</div>
		</>
	)
}

export default Welcome;
