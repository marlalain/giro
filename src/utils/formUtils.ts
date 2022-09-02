// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formReducer = (state: any, event: any) => {
	if (event.reset) {
		return {
			title: ''
		}
	}

	return {
		...state,
		[event.name]: event.value,
	}
}

export const handleChange = (event: any, set: any) => {
	set({
		name: event.target.name,
		value: event.target.value,
	});
};
