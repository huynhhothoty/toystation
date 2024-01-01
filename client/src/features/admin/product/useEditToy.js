import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateToy } from '../../../services/toyService';
import { App } from 'antd';

export function useEditToy() {
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    const { mutate: editToy, isPending: isEditingToy } = useMutation({
        mutationFn: ({ toyId, data }) => updateToy({ toyId, data }),
        onSuccess: () => {
            queryClient.invalidateQueries();
            message.success('Update product successfully!');
        },
        onError: () => {
            message.error('Update failed, try again');
        },
    });

    return { editToy, isEditingToy };
}
