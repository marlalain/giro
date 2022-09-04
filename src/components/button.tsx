type Props = {
	children: any;
	onClick?: () => void;
	className?: string;
}

const Button = ({children, className = "", ...props}: Props) => (
	<button
		className={`dark:bg-gray-700 bg-white dark:text-gray-50 dark:border-gray-100 dark:hover:border-blue-500 rounded-md border border-gray-300 dark:border-gray-600 px-4 py-1 hover:border-blue-500 focus:outline-none ${className}`}
		{...props}>
		{children}
	</button>
);

export default Button;
