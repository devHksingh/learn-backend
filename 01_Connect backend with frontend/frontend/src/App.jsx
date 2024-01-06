import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [user, setUser] = useState([])

  useEffect(()=>{
    axios.get('/api/user')
     .then((response)=>{
      setUser(response.data)
     })
     .catch((err)=>{
      console.log(err);
     })
  },[])
  return (
    <>
      <h1>Connect backend with frontend</h1>
      <p>User Data: {user.length}</p>
      {
        Array.isArray(user) && user.map((userData)=>{
          
          return <div key={userData.id}>
              <h3>{userData.firstname} {userData.lastname}</h3>
              <p>Email: {userData.email}</p>
              <p>Gender: {userData.gender}</p>
              <p>pic: {userData.image}</p>
              <p>pic: {userData.website}</p>
              
          </div>
        })
      }
    </>
  )
}

export default App
