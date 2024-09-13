import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/navbar.jsx'
import Rooms from './components/Rooms.jsx'
import Branches from './components/Branches.jsx'
import Arrange from './components/Arrange.jsx'

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path="/rooms" element = {<Rooms />} />
        <Route path = "/Branches" element = { <Branches /> }/>
        <Route path = "/arrange" element = { <Arrange/>} />
        <Route path='/*' element = { <> <h1>page not found!</h1></>}/>
      </Routes>
    </>
  )
}

export default App
