import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePerson } from "api/calls";
import { Person } from "api/models";
import { toast, ToastContent } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const useUpdatePerson = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Person) => updatePerson(id, data),
        {
            // Optimistic update
            onMutate: async (data) => {

                // Stop the queries that may affect this operation
                await queryClient.cancelQueries(["people", id])

                // Get a snapshot of current data
                const snapshot = queryClient.getQueryData<Person>(["people", id])

                // Modify cache to reflect this optimistic update
                queryClient.setQueryData(["people", id], data)

                // Return a snapshot so we can rollback in case of failure
                return {
                    snapshot,
                }
            },
            onError: (_error, _data, { snapshot }: any) => {

                // Error message
                toast.error("Oops! Something went wrong")

                // Set data back to the snapshot
                queryClient.setQueryData(["people", id], snapshot)

            },
            onSettled: () => {

                // Invalidate query
                queryClient.invalidateQueries(["people", id])


            },
            onSuccess: () => {
                // Success message
                toast.success("Person updated successfully")
            }
        }
    )
}

