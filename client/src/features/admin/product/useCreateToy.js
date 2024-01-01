import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createToy } from '../../../services/toyService';
import { App } from 'antd';

export function useCreateToy() {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const { mutate: addToy, isPending: isAddingToy } = useMutation({
        mutationFn: ({ data }) => createToy({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries();
            message.success('New product has been add successfully!');
        },
        onError: (err) => {
            message.error('Add new product failed, try again: ', err.message);
        },
    });
    return { addToy, isAddingToy };
}
