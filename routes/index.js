import expressRouter from "express";
import userRouter from "./userRoutes.js";

const router = expressRouter();

router.use("/user",userRouter);

export default router;