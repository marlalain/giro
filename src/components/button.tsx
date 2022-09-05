type Props = {
	children: any;
	onClick?: () => void;
	className?: string;
};

const Button = ({ children, className = '', ...props }: Props) => (
	<button
		className={`rounded-md border border-gray-300 bg-white px-4 py-1 hover:border-blue-500 focus:outline-none dark:border-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-50 dark:hover:border-blue-500 ${className}`}
		{...props}
	>
		{children}
	</button>
);

export default Button;
