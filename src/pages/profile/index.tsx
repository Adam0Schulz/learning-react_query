import { useParams } from "react-router"
import Button from "react-bootstrap/Button"
import { Person } from 'api/models'
import { useState, useRef, FormEvent } from "react"
import { useUpdatePerson } from "hooks/useUpdatePerson"
import { useGetPerson } from "hooks/useGetPerson"
import { Link } from "react-router-dom"
import { useDelPerson } from "hooks/useDelPerson"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PersonValidationSchema } from "yup/FormSchemas"

const Index = () => {

  const id = Number(useParams().id)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const {register, handleSubmit, formState: {errors}, unregister } = useForm<Person>({
    resolver: yupResolver(PersonValidationSchema),
    
  })

  if (!Number(id)) {
    window.location.href = "/profile"
  }

  const { data: person, isLoading, isError } = useGetPerson(id)
  const { mutate: updateMutate } = useUpdatePerson(id)
  const { mutate: delMute } = useDelPerson()

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Oops! Somethings wrong!</h1>

  const toggleEdit = () => {
    setIsEdit(!isEdit)
  }

  const submitForm = (data: Person) => {
    updateMutate(data)
    unregister()
    toggleEdit()
  }

  const deletion = () => {
    delMute(id)
    window.location.href = "/"
  }



  return (
    <div>
      {isEdit ?
        <form onSubmit={handleSubmit(submitForm)}>
          <input className={errors.firstname && "error_input"} {...register("firstname")} type="text" defaultValue={person.firstname} />
            <p className="error_message">{errors.firstname?.message}</p>
          <input className={errors.lastname && "error_input"} {...register("lastname")} type="text" defaultValue={person.lastname} />
            <p className="error_message">{errors.lastname?.message}</p>
          <input className={errors.address && "error_input"} {...register("address")} type="text" defaultValue={person.address} />
            <p className="error_message">{errors.address?.message}</p>
          <input className={errors.phone && "error_input"} {...register("phone")} type="number" defaultValue={person.phone} />
            <p className="error_message">{errors.phone?.message}</p>
          <Button type="submit" style={{ backgroundColor: "green", border: "none" }}>Save</Button>
          <Button onClick={toggleEdit} variant="secondary">Cancel</Button>
        </form>
        :
        <>
          <h1>{person.firstname}</h1>
          <p>{person.lastname}</p>
          <p>{person.address}</p>
          <p>{person.phone}</p>
          <Link to={"/"}><Button>Home</Button></Link>
          <Button onClick={toggleEdit} variant="secondary">Edit</Button>
          <Button onClick={() => deletion()} variant="secondary" style={{ backgroundColor: "darkred", border: "none" }}>Delete</Button>
        </>
      }
    </div>
  )

}

export default Index