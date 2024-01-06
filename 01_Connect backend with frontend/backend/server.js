import express from "express";

const port = process.env.PORT || 3010
const app = express()

async function apiCall(){
    const response = await fetch('https://randomuser.me/api/?results=5')
    const jsonData = await response.json()
    console.log(jsonData);
    return jsonData

}

app.get('/api/user',async(req,res)=>{

    const Userdata = await apiCall() 
    console.log(Userdata);
    let user =Userdata
    // let name = user.name.first
    // console.log(name);
    res.json({
        user
    })
})



app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
})
