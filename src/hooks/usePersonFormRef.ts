import { Person } from 'api/models'
import { RefObject, useRef } from 'react'

interface formRefObject {
    firstname: RefObject<HTMLInputElement>,
    lastname: RefObject<HTMLInputElement>,
    address: RefObject<HTMLInputElement>,
    phone: RefObject<HTMLInputElement>
}

export const usePersonFormRef = () => {

    const form: formRefObject = {
        firstname: useRef<HTMLInputElement>(null),
        lastname: useRef<HTMLInputElement>(null),
        address: useRef<HTMLInputElement>(null),
        phone: useRef<HTMLInputElement>(null)
    }

    const getFormData = (): Person => {
        if ( form.firstname.current == null 
            || form.lastname.current == null
            || form.address.current == null
            || form.phone.current == null 
            || !Number(form.phone.current.value)) throw new Error("Something's wrong")
        
        return {
            firstname: form.firstname.current.value,
            lastname: form.lastname.current.value,
            address: form.address.current.value,
            phone: Number(form.phone.current.value)
        }
    }


    return { form, getFormData }
}