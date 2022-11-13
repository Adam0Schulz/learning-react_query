import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePerson } from "api/calls";
import { Person } from "api/models";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const useDelPerson = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (id: number) => deletePerson(id),
        {

            //Optimistic updates
            onMutate: async (id) => {

                // Stop the queries that may affect this operation
                await queryClient.cancelQueries(["people"])

                // Get a snapshot of current data
                const snapshot = queryClient.getQueryData<Person>(["people"])

                // Modify cache to reflect this optimistic update
                // @ts-ignore
                queryClient.setQueryData(["people"], (oldPeople: Person[]) => oldPeople.filter(person => person.id !== id));

                // Return a snapshot so we can rollback in case of failure
                return {
                    snapshot,
                }
            },
            onError: (_error, _data, { snapshot }: any) => {

                // Set data back to the snapshot
                queryClient.setQueryData(["people"], snapshot)

                // Error message
                toast.error("Error deleting person")
            },
            onSettled: () => {

                // Invalidate query
                queryClient.invalidateQueries(["people"])

                // Success message
                toast.success("Person deleted successfully")
            }
        }
    )

}