import User from "../schemas/userSchema.js";  //why ..?
import asyncHandler from "express-async-Handler";  //purpose 


export const createUser = asyncHandler(async (req, res) => {
    try {
        const { username, phone, email, password } = req.body;//request 
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] }); //find method

        if (existingUser) {
            console.log("user already exists");
            return res.status(409), json({
                success: false,
                msg: "user already exists",
            });
        }


        const user = await User.create({
            username,
            phone,
            email,
            password
        });

        return res.status(201).json({
            success: true,
            msg: "user created successfully ",
            user
            //: {
            //     id: user.id,   //cant we directly display the object
            //     username: user.username,
            //     phone: user.phone,
            //     email: user.email,
            //     password: user.password
            // }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "server error", error })
    }
});


export const findById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        const userDoc = await User.findById(userId);

        if (!userDoc) {
            console.log("user not found by id");
            return res.status(404).json({
                success: false,
                message: "user not found by id",
            });
        }

        return res.status(200).json({
            success: true,
            msg: "user found by id",
            userDoc
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "server error ", error
        });
    }
});


export const updateUser = asyncHandler(async (req, res) => {
    try {
        const { userId, username, phone, email } = req.body;

        const existingUser = await User.findById(userId);
        if (existingUser == null) {
            console.log("user deos not exists")
            return res.status(404).json({
                success: false,
                msg: "user not found by id "
            });
        }

        const userDoc = await User.updateOne({ _id: userId }, //_??
            {
                username,
                phone,
                email
            });

        return res.status(200).json({
            success: true,
            msg: "user updated successfully",
            userDoc
        });


    } catch (error) {
        console.log("error ")
        return res.status(500).json({
            success: false,
            msg: "server error", error
        });
    }
});


export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        const userDoc = await User.findByIdAndDelete(userId);

        if (!userDoc) {
            return res.status({
                success: false,
                msg: "user not found by id"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "user deleted successfully by ID",
            userDoc
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "server error",
            error
        });
    }
});


export const findAllUsers = asyncHandler(async (req, res) => {
    try {
        const userDoc = await User.find();
        if (userDoc == null) {
            return res.status(404).json({
                success: false,
                msg: "no data found"
            });
        }
        return res.status(200).json({
            success: true,
            msg: "data fetched successfully ",
            data: userDoc
        });

    } catch (error) {
        console.log("server error");
        return res.status(500).json({
            success: false,
            msg: "server error",
            error: error.message
        });
    }
}); 

export const findAllUsersPage = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const sortField = req.query.sortField || "name";
        const sortOrder = req.query.sortOrder || "asc";
        const sort = {};
        sort[sortField] = sortOrder === "asc" ? 1 : -1;
        const startIndex = (page - 1) * pageSize;
        const totalDocuments = await User.countDocuments();
        const totalPages = Math.ceil(totalDocuments / pageSize);
        const users = await User.find({})
            .sort(sort)
            .skip(startIndex)
            .limit(pageSize)
            .exec();
        const userDoc = await User.find();
        if (userDoc == null) {
            return res.status(404).json({
                success: false,
                msg: "no data found"
            });
        }
        return res.status(200).json({
            success: true,
            users,
            pagination: {
                page,
                pageSize,
                totalPages,
                totalDocuments,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });

    } catch (error) {
        console.log("server error");
        return res.status(500).json({
            success: false,
            msg: "server error",
            error: error.message
        });
    }
});


export const findByPhone = asyncHandler(async (req, res) => {
    try {
        const {phone} = req.params;

        const userDoc = await User.find({phone : phone});

        if (!userDoc) {
            console.log("user not found by Phone");
            return res.status(404).json({
                success: false,
                message: "user not found by Phone",
            });
        }

        return res.status(200).json({
            success: true,
            msg: "user found by Phone",
            userDoc
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "server error ", error
        });
    }
});