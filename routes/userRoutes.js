import express from "express";

import{
    createUser,
    findById,
    updateUser,
    deleteUser,
    findAllUsers,
    findAllUsersPage,
    findByPhone
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/createUser").post(createUser);
userRouter.route("/findById/:id").get(findById);
userRouter.route("/updateUser").post(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);
userRouter.route("/findAllUsers").get(findAllUsers);
userRouter.route("/findAllUserPage").get(findAllUsersPage);
userRouter.route("/findByphone").get(findByPhone);

export default userRouter;