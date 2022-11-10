export interface Person {
    id?: number,
    firstname: string,
    lastname: string,
    address: string,
    phone: number
}

export interface OptionalPerson {
    id?: number,
    firstname?: string,
    lastname?: string,
    address?: string,
    phone?: number
}