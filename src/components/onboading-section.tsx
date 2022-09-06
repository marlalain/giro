type OnboardSectionProps = {
	name: string;
	description: string;
	children: any;
};

function OnboardSection({ name, description, children }: OnboardSectionProps) {
	return (
		<div className="md:grid md:grid-cols-4 md:gap-6">
			<div className="md:col-span-1">
				<div className="mt-12 px-4 sm:px-0 md:mt-0">
					<h3 className="text-lg font-medium leading-6 text-gray-700">
						{name}
					</h3>
					<p className="text-md mt-1 text-gray-600">{description}</p>
				</div>
			</div>

			<div className="hidden lg:col-span-1 lg:block"></div>

			<div className="mt-5 md:col-span-3 md:mt-0 lg:col-span-2">
				<div className="border shadow sm:overflow-hidden sm:rounded-md">
					<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
						<div className="grid grid-cols-3 gap-6">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OnboardSection;
