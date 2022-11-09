import { useParams } from "react-router"
import Button from "react-bootstrap/Button"
import { FormEvent, useState } from "react"
import {  OptionalPerson } from "api/models"
import { useUpdatePerson } from "hooks/useUpdatePerson"
import { useGetPerson } from "hooks/useGetPerson"
import { Link } from "react-router-dom"
import { useDelPerson } from "hooks/useDelPerson"

const Index = () => {

  const id = Number(useParams().id)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editedPerson, setEditedPerson] = useState<OptionalPerson | null>(null)

  if (!Number(id)) {
    window.location.href = "/profile"
  }

  const { data: person, isLoading, isError } = useGetPerson(id)
  const { mutate: updateMutate } = useUpdatePerson(id)
  const { mutate: delMute } = useDelPerson(id)

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Oops! Somethings wrong!</h1>

  const toggleEdit = () => {
    setEditedPerson(null)
    setIsEdit(!isEdit)
  }

  const handleSubmit = (e: FormEvent) => {
    updateMutate({...person, ...editedPerson})
    toggleEdit()
  }



  return (
    <div>
      {isEdit ?
        <>
          <input onChange={(e) => setEditedPerson({ ...editedPerson, firstname: e.target.value })} type="text" name="first" defaultValue={person.firstname} />
          <input onChange={(e) => setEditedPerson({ ...editedPerson, lastname: e.target.value })} type="text" name="last" defaultValue={person.lastname} />
          <input onChange={(e) => setEditedPerson({ ...editedPerson, address: e.target.value })} type="text" name="address" defaultValue={person.address} />
          <input onChange={(e) => setEditedPerson({ ...editedPerson, phone: Number(e.target.value) })} type="number" name="phone" defaultValue={person.phone} />
          <Button onClick={handleSubmit} style={{backgroundColor: "green", border: "none"}}>Save</Button>
          <Button onClick={toggleEdit} variant="secondary">Cancel</Button>
        </>
        :
        <>
          <h1>{person.firstname}</h1>
          <p>{person.lastname}</p>
          <p>{person.address}</p>
          <p>{person.phone}</p>
          <Link to={"/"}><Button>Home</Button></Link>
          <Button onClick={toggleEdit} variant="secondary">Edit</Button>
          <Button onClick={() => delMute()} variant="secondary" style={{backgroundColor: "darkred", border: "none"}}>Delete</Button>
        </>
      }
    </div>
  )

}

export default Index