import { useParams } from "react-router"
import Button from "react-bootstrap/Button"
import { Person } from 'api/models'
import { useState, useRef, FormEvent } from "react"
import { useUpdatePerson } from "hooks/useUpdatePerson"
import { useGetPerson } from "hooks/useGetPerson"
import { Link } from "react-router-dom"
import { useDelPerson } from "hooks/useDelPerson"
import { isMetaProperty } from "typescript"
import { usePersonFormRef } from "hooks/usePersonFormRef"

const Index = () => {

  const id = Number(useParams().id)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const { form, getFormData} = usePersonFormRef()

  if (!Number(id)) {
    window.location.href = "/profile"
  }

  const { data: person, isLoading, isError } = useGetPerson(id)
  const { mutate: updateMutate } = useUpdatePerson(id)
  const { mutate: delMute } = useDelPerson(id)

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Oops! Somethings wrong!</h1>

  const toggleEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    updateMutate(getFormData())
    
    toggleEdit()
  }

  const deletion = () => {
    delMute()
    window.location.href = "/"
  }



  return (
    <div>
      {isEdit ?
        <form onSubmit={handleSubmit}>
          <input ref={form.firstname} type="text" name="first" defaultValue={person.firstname} />
          <input ref={form.lastname} type="text" name="last" defaultValue={person.lastname} />
          <input ref={form.address} type="text" name="address" defaultValue={person.address} />
          <input ref={form.phone} type="number" name="phone" defaultValue={person.phone} />
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