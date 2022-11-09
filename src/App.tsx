import { Routes, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFoundPage from './pages/404'
import ContactPage from './pages/contact'
import ProfilePage from './pages/profile'
import HomePage from './pages/home'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} /> 
      <Route path='/profile/:id' element={<ProfilePage />} /> 
      <Route path='/contact' element={<ContactPage />} /> 
      <Route path='/404' element={<NotFoundPage />} /> 
      <Route path='/*' element={<NotFoundPage />} /> 
    </Routes>
  );
}

export default App;
