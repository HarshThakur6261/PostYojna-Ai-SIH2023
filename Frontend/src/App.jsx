import { useState } from 'react'


import './App.css'
import Sidebar from './components/sidebar/SideBar'

import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'

function App() {
 

  return (
    <>
    
     <Outlet/>
    </>
  )
}

export default App
