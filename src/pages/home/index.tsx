import { OptionalPerson, Person } from 'api/models'
import { Link } from 'react-router-dom'
import { useGetPeople } from 'hooks/useGetPeople'
import { Button } from 'react-bootstrap'
import { useAddPerson } from 'hooks/useAddPerson'
import { useState } from 'react'

const Index = () => {

    const [isFormOpened, setIsFormOpened] = useState<boolean>(false)
    const [newPerson, setNewPerson] = useState<OptionalPerson>({})
    const { data: personData, isLoading, isError } = useGetPeople()
    const { mutate: addMutation } = useAddPerson()

    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load people!</h1>

    const toggleAddForm = () => {
        setIsFormOpened(!isFormOpened)
    }

    const handleSubmit = () => {
        addMutation(newPerson as Person)
        toggleAddForm()
    }

    return (
        <div>
            {personData?.map((item: Person) => <Link to={"/profile/" + item.id}><h1>{item.firstname}</h1></Link>)}
            <Button onClick={toggleAddForm} style={isFormOpened ? { backgroundColor: "gray" } : { backgroundColor: "green" }}>{isFormOpened ? "Close" : "Add"}</Button>
            {isFormOpened &&
                <>
                    <input onChange={(e) => setNewPerson({ ...newPerson, firstname: e.target.value })} type="text" placeholder="First Name" required />
                    <input onChange={(e) => setNewPerson({ ...newPerson, lastname: e.target.value })} type="text" placeholder="Last Name" required />
                    <input onChange={(e) => setNewPerson({ ...newPerson, address: e.target.value })} type="text" placeholder="Address" required />
                    <input onChange={(e) => setNewPerson({ ...newPerson, phone: Number(e.target.value) })} type="number" placeholder="Phone" required />
                    
                    <Button onClick={handleSubmit}>Save</Button>
                </>
            }
        </div>
    )
}

export default Index