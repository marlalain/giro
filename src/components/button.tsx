type Props = {
	children: any;
	onClick?: () => void;
	className?: string;
}

const Button = ({children, className = "", ...props}: Props) => (
	<button
		className={`rounded-md border px-4 py-1 hover:border-blue-500 focus:outline-none ${className}`}
		{...props}>
		{children}
	</button>
);

export default Button;
