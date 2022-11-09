import { Person } from 'api/models'
import { Link } from 'react-router-dom'
import { useGetPeople } from 'hooks/useGetPeople'

const Index = () => {

    const { data: personData, isLoading, isError } = useGetPeople()

    if (isLoading) return <h1>Loading...</h1>

    if(isError) return <h1>Oops! Couldn't load people!</h1>

    return (
        <div>{personData?.map((item: Person) => <Link to={"/profile/" + item.id}><h1>{item.firstname}</h1></Link>)}</div>
    )
}

export default Index