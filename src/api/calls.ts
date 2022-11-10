import api from './config'
import { Person } from './models'

export const getPeople = async (): Promise<Person[]> => {
    return api.get("/people").then(res => res.data).catch(err => {throw new Error('Something went wrong')})
}

export const getPerson = async (id: number): Promise<Person> => {
    return api.get("/people/" + id).then(res => res.data).catch(err => {throw new Error('Something went wrong')})
}

export const updatePerson = async (id: number, newPerson: Person): Promise<Person> => {
    return api.put("/people/" + id, newPerson).then(res => res.data).catch(err => {throw new Error('Something went wrong')})
}

export const deletePerson = async (id: number): Promise<Person> => {
    return api.delete("/people/" + id).then(res => res.data).catch(err => {throw new Error('Something went wrong')})
}

export const createPerson = async (newPerson: Person): Promise<Person> => {
    return api.post("/people", newPerson).then(res => res.data).catch(err =>  {throw new Error('Something went wrong')})
}