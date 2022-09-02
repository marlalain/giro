import {NextComponentType} from "next";
import {Box, Button, Center, Flex, Input} from "@chakra-ui/react";
import {trpc} from "../../utils/trpc";
import {useReducer} from "react";
import {formReducer, handleChange} from "../../utils/formUtils";

const DeadlineInput: NextComponentType = () => {
	const create = trpc.useMutation(['project.create']);
	const table = trpc.useQuery(['project.getProjects'])
	const [form, setForm] = useReducer(formReducer, {});

	return (
		<Center bg='blackAlpha.50' pb={10}>
			<Flex mt={12} w='60%' h='20%'>
				<Box flexGrow={1}>
					<Input
						name={'title'}
						value={form.title || ''}
						onChange={(e) => handleChange(e, setForm)}
						autoFocus
						bg='white'
						size='lg'
						placeholder='Type a project title...'/>
				</Box>

				<Box w={2}/>

				<Box>
					<Button
						onClick={() =>
							create.mutateAsync(form)
								.then(() => setForm({reset: true}))
								.then(() => table.refetch())}
						height='100%'
						variant='ghost'
						colorScheme='gray'>Enter</Button>
				</Box>
			</Flex>
		</Center>
	)
}

export default DeadlineInput;
