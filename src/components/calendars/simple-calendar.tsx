import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import moment from "moment/moment";

type Day = {
	date: string;
	isCurrentMonth?: boolean;
	isToday?: boolean;
	isSelected?: boolean;
};

const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ');

const SimpleCalendar = () => {
	const today = moment();
	const [selectedDay, setSelectedDay] = useState(today.clone());
	const [currentDate, setCurrentDate] = useState(today.clone().startOf('day'));

	const daysToRender = 35;
	const firstDayOfWeek = currentDate.clone().startOf('month').startOf('week');
	const currentMonth = currentDate.format("MMMM");
	const currentYear = currentDate.format("YYYY");

	const days = new Array(daysToRender).fill(0).map((_, i) => {
		const day = moment(firstDayOfWeek).add(++i, 'days');

		return {
			date: day.format('YYYY-MM-DD'),
			isCurrentMonth: day.month() === currentDate.month(),
			isToday: day.isSame(moment(), 'day'),
			isSelected: day.isSame(selectedDay, 'day'),
		};
	});

	return (
		<div className="col-span-3 px-2 py-1.5">
			<div className="flex items-center">
				<h2 className="flex-auto font-medium text-gray-800">{currentMonth} {currentYear}</h2>

				<button
					onClick={() => setCurrentDate(currentDate.clone().subtract(1, 'month'))}
					className="-my-1.5 flex flex-none items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
					<span className="sr-only">Previous month</span>
					<ChevronLeftIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true"/>
				</button>

				<button
					onClick={() => setCurrentDate(currentDate.clone().add(1, 'month'))}
					className="5 -my-1 flex flex-none items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
					<span className="sr-only">Next month</span>
					<ChevronRightIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true"/>
				</button>
			</div>

			<div
				className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
				<div>M</div>
				<div>T</div>
				<div>W</div>
				<div>T</div>
				<div>F</div>
				<div>S</div>
				<div>S</div>
			</div>

			<div className="mt-2 grid grid-cols-7 text-sm">
				{days.map((day, i) => (
					<div key={day.date} className="py-2">
						<button
							onClick={() => setSelectedDay(moment(day.date))}
							className={classNames(
								day.isSelected && 'text-white',
								!day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900',
								!day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400',
								day.isSelected && day.isToday && 'bg-pink-600',
								day.isSelected && !day.isToday && 'bg-pink-600',
								!day.isSelected && 'hover:bg-pink-200',
								(day.isSelected || day.isToday) && 'font-semibold',
								'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
							)}>
							<time
								className={classNames(
									day.isToday && 'border border-transparent px-1 border-2 border-b-pink-600',
								)}
								dateTime={day.date}>{day.date.split('-').pop()?.replace(/^0/, '')}</time>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default SimpleCalendar;
