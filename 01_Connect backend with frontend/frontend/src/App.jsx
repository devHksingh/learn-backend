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
      // const userData = response.data.testData
      // console.log(userData);
      setUser(response.data.testData)
     })
     .catch((err)=>{
      console.log(err);
     })
  },[])
  return (
    <>
      <h1>Connect backend with frontend</h1>
      <p>User Data: {user.length}</p>
      {/* {console.log(user['testData'][0]) */}
      {/* } */}
      {
        Array.isArray(user) && user.map((userData)=>{
          
          return <div key={userData.id} >
              <img src={userData.pic} alt="User pic"  />
              <h3>{userData.title} {userData.firstName} {userData.lastName}</h3>
              <p>Email: {userData.email}</p>
              <p>Gender: {userData.gender}</p>
              <p>country: {userData.country}</p>
              <p>email: {userData.email}</p>
              {/* <p>pic: {userData.pic}</p> */}
              
              
          </div>
        })
      }
    </>
  )
}

export default App
