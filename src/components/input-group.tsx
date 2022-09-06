import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputGroupProps = {
	name: string;
	text?: string;
	placeholder?: string;
	textarea?: boolean;
	register: UseFormRegister<FieldValues>;
};

const InputGroup = ({
	name,
	text,
	placeholder,
	textarea,
	register,
}: InputGroupProps) => (
	<div className="col-span-3">
		<label htmlFor={name} className="block text-sm font-medium text-gray-700">
			{text || name}
		</label>
		<div className="mt-2">
			{textarea ? (
				<textarea
					id={name}
					rows={3}
					className="block w-full flex-1 rounded-md border border-gray-300 shadow-sm hover:border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
					placeholder={placeholder || name}
					{...register(name)}
				/>
			) : (
				<input
					id={name}
					className="block w-full flex-1 rounded-md border border-gray-300 shadow-sm hover:border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
					placeholder={placeholder || name}
					type="text"
					{...register(name)}
				/>
			)}
		</div>
	</div>
);

export default InputGroup;
