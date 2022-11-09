import { useQuery } from '@tanstack/react-query'
import { getPeople } from 'api/calls'

export const useGetPeople = () => {
    return useQuery(["people"], getPeople)
}