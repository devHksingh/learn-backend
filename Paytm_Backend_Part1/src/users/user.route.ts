import express from "express"
import { createUser, getAllUser, getSingleUser, userSignIn } from "./user.Controller"

const userRoute = express.Router()



userRoute.get('/',
    getAllUser
)

userRoute.get('/:userId',
    getSingleUser
)

userRoute.post('/',
    createUser
)

userRoute.post('/signin',
    userSignIn
)

// userRoute.patch('/:userId',
//     updateSingleUser
// )

export default userRoute