import { useMutation, useQueryClient} from "@tanstack/react-query"
import { updatePerson } from "api/calls";
import { Person } from "api/models";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const useUpdatePerson = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Person) => updatePerson(id, data),
        {
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

                // Set data back to the snapshot
                queryClient.setQueryData(["people", id], snapshot)

                // Error message
                toast.error("Error updating person")
            },
            onSettled: () => {

                // Invalidate query
                queryClient.invalidateQueries(["people", id])

                // Success message
                toast.success("Person updated successfully")
            }
        }
    )
}

