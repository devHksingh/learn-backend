import express from "express";

const port = process.env.PORT || 3010
const app = express()

async function apiCall(){
    const response = await fetch('https://randomuser.me/api/?results=5')
    const jsonData = await response.json()
    // console.log(jsonData);
    return jsonData

}

app.get('/api/user',async(req,res)=>{

    const Userdata = await apiCall() 
    // console.log(Userdata);
    let user =Userdata
    let name = user["results"]
    let testData = []
    name.map((user)=>{
            const userData = {
                id: `${user["login"]["uuid"]}`,
                title:`${user["name"]["title"]}`,
                firstName:`${user["name"]["first"]}`,
                lastName:`${user["name"]["last"]}`,
                country:`${user["location"]["country"]}`,
                gender:`${user["gender"]}`,
                email:`${user["email"]}`,
                pic:`${user["picture"]["medium"]}`,
            }
            testData.push(userData)
    })

    // [0]["name"]["first"]
    console.log(name.length);
    res.json({
        testData
    })
})

app.get('/test',(req,res)=>{
    res.send('test call')
})



app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
})
