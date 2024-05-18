import express from "express"

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

userRoute.patch('/:userId',
    updateSingleUser
)

export default userRoute