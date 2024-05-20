import express from "express"
import { createUser, getAllUser, getSingleUser } from "./user.Controller"

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

// userRoute.patch('/:userId',
//     updateSingleUser
// )

export default userRoute