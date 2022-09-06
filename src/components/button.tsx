type Props = {
	children: any;
	onClick?: () => void;
	className?: string;
	submit?: boolean;
};

const Button = ({ children, className = '', submit, ...props }: Props) => (
	<button
		className={`rounded-md border border-gray-300 bg-white px-4 py-1 hover:border-pink-500 focus:outline-none dark:border-gray-100 dark:bg-gray-700 dark:text-gray-50 dark:hover:border-pink-500 ${className}`}
		type={submit ? 'submit' : 'button'}
		{...props}
	>
		{children}
	</button>
);

export default Button;
