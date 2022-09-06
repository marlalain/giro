import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import moment from 'moment/moment';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ');

type CalendarProps = {
	setValue: UseFormSetValue<FieldValues>;
};

const SimpleCalendar = ({ setValue }: CalendarProps) => {
	const today = moment();
	const [currentDate, setCurrentDate] = useState(today.clone().startOf('day'));
	const [selectedDay, setSelectedDay] = useState(today.clone());
	const changeSelectedDay = (day: moment.Moment) => {
		setSelectedDay(day);
		setValue('deadlineDate', day.format('YYYY-MM-DD'));
	};

	const daysToRender = 35;
	const firstDayOfWeek = currentDate.clone().startOf('month').startOf('week');
	const currentMonth = currentDate.format('MMMM').toLowerCase();
	const currentYear = currentDate.format('YYYY');

	const days = new Array(daysToRender).fill(0).map((_, i) => {
		const day = moment(firstDayOfWeek).add(++i, 'days');

		return {
			date: day.format('YYYY-MM-DD'),
			isCurrentMonth: day.month() === currentDate.month(),
			isToday: day.isSame(today.clone(), 'day'),
			isSelected: day.isSame(selectedDay, 'day'),
		};
	});

	return (
		<div className="col-span-3 px-2 py-1.5">
			<div className="flex items-center">
				<h2 className="flex-auto font-medium text-gray-800">
					{currentMonth} {currentYear}
				</h2>

				<button
					type="button"
					onClick={() =>
						setCurrentDate(currentDate.clone().subtract(1, 'month'))
					}
					className="-my-1.5 flex flex-none items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
				>
					<span className="sr-only">Previous month</span>
					<ChevronLeftIcon
						className="h-5 w-5 lg:h-6 lg:w-6"
						aria-hidden="true"
					/>
				</button>

				<button
					type="button"
					onClick={() => setCurrentDate(currentDate.clone().add(1, 'month'))}
					className="-my-1.5 flex flex-none items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
				>
					<span className="sr-only">Next month</span>
					<ChevronRightIcon
						className="h-5 w-5 lg:h-6 lg:w-6"
						aria-hidden="true"
					/>
				</button>
			</div>

			<div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
				<div>M</div>
				<div>T</div>
				<div>W</div>
				<div>T</div>
				<div>F</div>
				<div>S</div>
				<div>S</div>
			</div>

			<div className="mt-2 grid grid-cols-7 text-sm">
				{days.map((day) => (
					<div key={day.date} className="py-2">
						<button
							type="button"
							onClick={() => changeSelectedDay(moment(day.date))}
							className={classNames(
								day.isSelected && 'text-white',
								!day.isSelected &&
									!day.isToday &&
									day.isCurrentMonth &&
									'text-gray-900',
								!day.isSelected &&
									!day.isToday &&
									!day.isCurrentMonth &&
									'text-gray-400',
								day.isSelected && day.isToday && 'bg-pink-600',
								day.isSelected && !day.isToday && 'bg-pink-600',
								!day.isSelected && 'hover:bg-pink-200',
								(day.isSelected || day.isToday) && 'font-semibold',
								'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
							)}
						>
							<time
								className={classNames(
									day.isToday &&
										'border border-2 border-transparent border-b-pink-600 px-1',
								)}
								dateTime={day.date}
							>
								{moment(day.date).format('D')}
							</time>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SimpleCalendar;
