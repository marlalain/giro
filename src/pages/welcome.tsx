import { NextPage } from 'next';
import CustomHead from '../components/custom-head';
import Button from '../components/button';
import SimpleCalendar from '../components/calendars/simple-calendar';
import TimePicker from '../components/calendars/time-picker';
import OnboardSection from '../components/onboading-section';
import InputGroup from '../components/input-group';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';

function Divider() {
	return (
		<div className="hidden sm:block" aria-hidden="true">
			<div className="pt-8 pb-5">
				<div className="border-t border-gray-200" />
			</div>
		</div>
	);
}

const Welcome: NextPage = () => {
	const { register, handleSubmit, setValue } = useForm();
	const welcomeForm = trpc.useMutation('onboard.welcome');

	const deadlineTime = (hour: string, minute: string) =>
		`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
	const deadlineDate = (data: any) => {
		const date = data.deadlineDate;
		const time = deadlineTime(
			String(data.deadlineHour),
			String(data.deadlineMinute),
		);

		return new Date(`${date}T${time}`);
	};

	const onSubmit = (data: any) => {
		console.log(data);

		welcomeForm.mutate({
			project: {
				title: data.projectTitle,
				description: data.projectDescription,
			},
			deadline: {
				description: data.deadlineDescription,
				date: deadlineDate(data),
			},
			task: {
				title: data.taskTitle,
				description: data.taskDescription,
			},
		});
	};

	return (
		<>
			<CustomHead />

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="my-10 mx-auto rounded-md border bg-white pt-8 sm:w-full md:w-10/12 lg:w-8/12"
			>
				<div className="mb-6 px-8">
					<h2 className="mb-2 text-center text-xl font-medium leading-3 text-gray-600">
						welcome to giro!
					</h2>

					<p className="text-center text-gray-600">
						it&apos;s nice having you here. let&apos;s learn how to configure
						your homepage first. <br />
						and don&apos;t worry: you can create more projects, deadlines, and
						tasks later
					</p>

					<Divider />

					<OnboardSection
						name="project"
						description="a project is a major goal that you want to achieve"
					>
						<InputGroup
							name="projectTitle"
							text={'title'}
							placeholder={'learn a new language'}
							register={register}
						/>
						<InputGroup
							textarea
							name={'projectDescription'}
							text={'description'}
							placeholder={'always wanted to learn french'}
							register={register}
						/>
					</OnboardSection>

					<Divider />

					<OnboardSection
						name="deadline"
						description="a deadline is a date that you want to achieve your tasks by"
					>
						<InputGroup
							textarea
							placeholder="a cool stream about french happens around this date"
							text="description"
							name="deadlineDescription"
							register={register}
						/>
						<SimpleCalendar setValue={setValue} />
						<TimePicker register={register} />
					</OnboardSection>

					<Divider />

					<OnboardSection name="task" description="simple tasks">
						<InputGroup
							name="taskTitle"
							text="title"
							placeholder="learn ten words"
							register={register}
						/>
						<InputGroup
							textarea
							name="taskDescription"
							text="description"
							placeholder="ten words a day keep the bird away"
							register={register}
						/>
					</OnboardSection>

					<Divider />

					<p className="mt-12 text-center text-gray-600 md:mt-0">
						one project can have many deadlines and a deadline can have many
						tasks
					</p>
				</div>

				<div className="w-full text-right">
					<Button submit className="mr-8 mb-6">
						next
					</Button>
				</div>
			</form>
		</>
	);
};

export default Welcome;
