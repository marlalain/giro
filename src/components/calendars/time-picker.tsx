import { FieldValues, UseFormRegister } from 'react-hook-form';

type TimePickerProps = {
	register: UseFormRegister<FieldValues>;
};

function TimePicker({ register }: TimePickerProps) {
	return (
		<div className="col-span-3 flex items-center justify-center">
			<div className="mx-10 mt-1 flex rounded-md shadow-sm">
				<label
					htmlFor="deadlineHour"
					className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
				>
					hour
				</label>

				<input
					id="deadlineHour"
					className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-pink-800 focus:ring-pink-500 sm:text-sm"
					placeholder="15"
					type="number"
					{...register('deadlineHour', {
						valueAsNumber: true,
					})}
				/>
			</div>

			<div className="mt-1 mr-10 flex rounded-md shadow-sm">
				<label
					htmlFor="deadlineMinute"
					className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
				>
					minute
				</label>

				<input
					id="deadlineMinute"
					className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-pink-800 focus:ring-pink-500 sm:text-sm"
					placeholder="00"
					type="number"
					{...register('deadlineMinute', {
						valueAsNumber: true,
					})}
				/>
			</div>
		</div>
	);
}

export default TimePicker;
