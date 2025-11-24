import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export function createUser(req,res) {
    const role = req.body.role || "customer" ;

    if (role === "admin") {
        if(!req.user || req.user.role !== "admin" ){
            return res.status(403).json({
                message: "Unauthorized: only admins can create another admin"
                });
        }
    }



const hashedPassword = bcrypt.hashSync(req.body.password,10)

//new user created using request's body
const user = new User ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    role: role
})

//save the user
user.save()
//after user created keep user logged in using jwt token
    .then(()=>{
        const token = jwt.sign(
            {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            process.env.JWT_KEY
        )

        res.status(201).json({
                message: "User created successfully",
                token: token,
                role: user.role
            });
    })
    .catch((err) => {
            res.status(500).json({
                message: "Error creating user",
                error: err.message
            });
        });
}

export function isAdmin(req){
    if(!req.user) return false;
    return req.user.role === "admin"
}