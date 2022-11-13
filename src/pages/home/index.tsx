import { Person } from 'api/models'
import { Link } from 'react-router-dom'
import { useGetPeople } from 'hooks/useGetPeople'
import { Button } from 'react-bootstrap'
import { useAddPerson } from 'hooks/useAddPerson'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PersonValidationSchema } from 'yup/FormSchemas'
import { useDelPerson } from 'hooks/useDelPerson'

const Indexo = () => {

    const [isFormOpened, setIsFormOpened] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Person>({
        resolver: yupResolver(PersonValidationSchema),
        shouldUnregister: true
    })
    const { data: personData, isLoading, isError } = useGetPeople()
    const { mutate: addMutation } = useAddPerson()
    const { mutate: delMute } = useDelPerson()

    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load people!</h1>

    const toggleAddForm = () => {
        setIsFormOpened(!isFormOpened)
    }

    const handleForm = (data: Person) => {
        addMutation(data)
        toggleAddForm()
    }

    return (
        <div>
            {personData?.map((item: Person) =>
                <section>
                    <Link key={item.id} to={"/profile/" + item.id}>
                        <h1>{item.firstname}</h1>
                    </Link>
                    <Button onClick={() => item.id && delMute(item.id)} style={{ backgroundColor: "darkred" }}>Delete</Button>
                </section>
            )}

            <Button onClick={toggleAddForm} style={isFormOpened ? { backgroundColor: "gray" } : { backgroundColor: "green" }}>{isFormOpened ? "Close" : "Add"}</Button>
            {isFormOpened &&
                <form onSubmit={handleSubmit(handleForm)}>
                    <input className={errors.firstname && "error_input"} {...register("firstname")} type="text" placeholder="First Name" />
                    <p className="error_message">{errors.firstname?.message}</p>
                    <input className={errors.lastname && "error_input"} {...register("lastname")} type="text" placeholder="Last Name" />
                    <p className="error_message">{errors.lastname?.message}</p>
                    <input className={errors.address && "error_input"} {...register("address")} type="text" placeholder="Address" />
                    <p className="error_message">{errors.address?.message}</p>
                    <input className={errors.phone && "error_input"} {...register("phone")} type="number" placeholder="Phone" />
                    <p className="error_message">{errors.phone?.message}</p>

                    <Button type="submit">Save</Button>
                </form>
            }
        </div>
    )
}

export default Indexo