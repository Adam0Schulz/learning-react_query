import {useQuery } from "@tanstack/react-query"
import { getPerson } from "api/calls";

export const useGetPerson = (id: number) => {
    return useQuery(["people", id], () => getPerson(id))
}

