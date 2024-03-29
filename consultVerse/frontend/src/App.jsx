import Admin from "./Components/Admin"
import Expert from './Components/Expert'
import {Routes,Route } from 'react-router-dom'


const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" Component={Admin} />
    <Route path="/expert" Component={Expert} />

   </Routes>
   </>
  )
}

export default App