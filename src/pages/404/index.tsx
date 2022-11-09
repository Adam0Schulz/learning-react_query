import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'


const Index = () => {
  return (
    <>
        <h1>404: Page not found!</h1>
        <Link to={"/"}><Button>Go back home</Button></Link>
    </>
  )
}

export default Index