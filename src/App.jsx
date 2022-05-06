import { useEffect, useState } from 'react'
import axios from 'axios'
import Home from '../src/pages/home'


import './App.css'

const App=()=>{

const [RideData,setRideData] = useState([])
const [user,setUser]= useState(null)

const userData=async()=>{
  const response=await axios('https://assessment.api.vweb.app/user')
  if(response) setUser(response.data)
  else console.log('some error happend')
}

const fetchData=async()=>{
  const response=await axios.get('https://assessment.api.vweb.app/rides')
  if(response)
  setRideData(response.data)
  else
  console.log('some error happend')
}

useEffect(()=>{
  fetchData()
  userData()
},[])
  
  return (
    <>
           {user && <Home user={user} RideData={RideData} /> }
           
    </>
  )
}

export default App

