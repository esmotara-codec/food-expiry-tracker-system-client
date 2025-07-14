import { Outlet } from 'react-router'
import './App.css'
import Headers from './component/NavBar/Headers'

function App() {
  
  return (
    <>
      <div>  
        <Headers/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
