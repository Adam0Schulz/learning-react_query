import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPerson } from "api/calls";
import { Person } from "api/models";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export const useAddPerson = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Person) => createPerson(data),
        {

            //Optimistic updates
            onMutate: async (data) => {

                // Stop the queries that may affect this operation
                await queryClient.cancelQueries(["people"])

                // Get a snapshot of current data
                const snapshot = queryClient.getQueryData<Person>(["people"])

                // Modify cache to reflect this optimistic update
                // @ts-ignore
                queryClient.setQueryData(["people"], (oldPeople: Person[]) => [...oldPeople, data]);

                // Return a snapshot so we can rollback in case of failure
                return {
                    snapshot,
                }
            },
            onError: (_error, _data, { snapshot }: any) => {

                // Set data back to the snapshot
                queryClient.setQueryData(["people"], snapshot)

                // Error message
                toast.error("Error adding person")
            },
            onSettled: () => {

                // Invalidate query
                queryClient.invalidateQueries(["people"])

                // Success message
                toast.success("Person added successfully")
            }
        }
    )

}
