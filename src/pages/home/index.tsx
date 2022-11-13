import { Person } from 'api/models'
import { Link } from 'react-router-dom'
import { useGetPeople } from 'hooks/useGetPeople'
import { Button } from 'react-bootstrap'
import { useAddPerson } from 'hooks/useAddPerson'
import { FormEvent, useRef, useState } from 'react'
import { usePersonFormRef } from 'hooks/usePersonFormRef'

const Index = () => {

    const [isFormOpened, setIsFormOpened] = useState<boolean>(false)
    const { form, getFormData } = usePersonFormRef()
    const { data: personData, isLoading, isError } = useGetPeople()
    const { mutate: addMutation } = useAddPerson()

    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load people!</h1>

    const toggleAddForm = () => {
        setIsFormOpened(!isFormOpened)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        addMutation(getFormData())
        toggleAddForm()
    }

    return (
        <div>
            {personData?.map((item: Person) => <Link key={item.id} to={"/profile/" + item.id}><h1>{item.firstname}</h1></Link>)}
            <Button onClick={toggleAddForm} style={isFormOpened ? { backgroundColor: "gray" } : { backgroundColor: "green" }}>{isFormOpened ? "Close" : "Add"}</Button>
            {isFormOpened &&
                <form onSubmit={handleSubmit}>
                    <input ref={form.firstname} type="text" placeholder="First Name" required />
                    <input ref={form.lastname} type="text" placeholder="Last Name" required />
                    <input ref={form.address} type="text" placeholder="Address" required />
                    <input ref={form.phone} type="number" placeholder="Phone" required />

                    <Button type="submit">Save</Button>
                </form>
            }
        </div>
    )
}

export default Index