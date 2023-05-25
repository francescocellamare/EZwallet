import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { verifyAuth } from './utils.js';

/**
 * Register a new user in the system
  - Request Body Content: An object having attributes `username`, `email` and `password`
  - Response `data` Content: A message confirming successful insertion
  - Optional behavior:
    - error 400 is returned if there is already a user with the same username and/or email
 */
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ 
            $or:[
            {email: req.body.email },
            {username: req.body.username}
            ]});
        if (existingUser) return res.status(400).json({ 
        data:{message: "you are already registered"},
        message:"" });
        if((username=="")||(email=="")||(password=="")){
            return res.status(400).json({
                data: {
                    message: "empty fields are not allowed"
                },
                message: ""
            })
        }

        if((!username)||(!email)||(!password))
        {return res.status(400).json({ 
            data:{message: "some fields are missing"},
            message:"" });}
        
        let regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        const emailValid = regex.test(email)
        if(!emailValid) return res.status(400).json({data:{message:'invalid email'}, message:""});
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(200).json({data:{message: 'user added succesfully'}, message:""});
    } catch (err) {
        res.status(400).json(err);
    }
};
    
    /**
     * Register a new user in the system with an Admin role
      - Request Body Content: An object having attributes `username`, `email` and `password`
      - Response `data` Content: A message confirming successful insertion
      - Optional behavior:
        - error 400 is returned if there is already a user with the same username and/or email
     */
export const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await User.findOne({ 
            $or:[
            {email: req.body.email },
            {username: req.body.username}
            ]});
        if (existingUser) return res.status(400).json({ 
            data : {
            message: "you are already registered" 
        },
            message : ""});
        if((username=="")||(email=="")||(password=="")){
            return res.status(400).json({
                data: {
                    message: "empty fields are not allowed"
                },
                message: ""
            })
        }
        if((!username)||(!email)||(!password))
        {return res.status(400).json({ 
            data:{message: "some fields are missing"},
            message:"" });}
        let regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        const emailValid = regex.test(email)
        if(!emailValid) return res.status(400).json({data:{message:'invalid email'}, message:""});
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "Admin"
        });
        res.status(200).json(
            
            
            {
                data : {
                    message : "admin added succesfully"
                },
                message : ""
            });
            
       
    } catch (err) {
        res.status(500).json(err);
    }

}

    
    

/**
 * Perform login 
  - Request Body Content: An object having attributes `email` and `password`
  - Response `data` Content: An object with the created accessToken and refreshToken
  - Optional behavior:
    - error 400 is returned if the user does not exist
    - error 400 is returned if the supplied password does not match with the one in the database
 */
export const login = async (req, res) => {
        const { email, password } = req.body
        const cookie = req.cookies
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) return res.status(400).json({data:{ message: 'please you need to register'}, message:''})
        try {
            if((email=="")||(password=="")){
                return res.status(400).json({
                    data: {
                        message: "empty fields are not allowed"
                    },
                    message: ""
                })
            }
            if((!email)||(!password))
            {return res.status(400).json({ 
                data:{message: "some fields are missing"},
                message:"" });}
            let regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            const emailValid = regex.test(email)
            if(!emailValid) return res.status(400).json({data:{message:'invalid email'}, message:""});
            const match = await bcrypt.compare(password, existingUser.password)
            if (!match) return res.status(400).json({data:{message:'wrong credentials'}, message:''})
            //CREATE ACCESSTOKEN
            const accessToken = jwt.sign({
                email: existingUser.email,
                id: existingUser.id,
                username: existingUser.username,
                role: existingUser.role
            }, process.env.ACCESS_KEY, { expiresIn: '1h' })
            //CREATE REFRESH TOKEN
            const refreshToken = jwt.sign({
                email: existingUser.email,
                id: existingUser.id,
                username: existingUser.username,
                role: existingUser.role
            }, process.env.ACCESS_KEY, { expiresIn: '7d' })
            //SAVE REFRESH TOKEN TO DB
            existingUser.refreshToken = refreshToken
            const savedUser = await existingUser.save()
            res.cookie("accessToken", accessToken, expect.objectContaining({ httpOnly: true, domain: "localhost", path: "/api", maxAge: 60 * 60 * 1000, sameSite: "none", secure: true }))
            res.cookie('refreshToken', refreshToken, expect.objectContaining({ httpOnly: true, domain: "localhost", path: '/api', maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true }))
            res.status(200).json({ data: { accessToken: accessToken, refreshToken: refreshToken } })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    
/**
 * Perform logout
  - Auth type: Simple
  - Request Body Content: None
  - Response `data` Content: A message confirming successful logout
  - Optional behavior:
    - error 400 is returned if the user does not exist
 */
export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(400).json({data:{message: "user not found"}, message:""})
    const user = await User.findOne({ refreshToken: refreshToken })
    if (!user) return res.status(400).json({data: {
        message:'user not found'},
    message: ''})
    try {
        user.refreshToken = null
        res.cookie("accessToken", "", { httpOnly: true, path: '/api', maxAge: 0, sameSite: 'none', secure: true })
        res.cookie('refreshToken', "", { httpOnly: true, path: '/api', maxAge: 0, sameSite: 'none', secure: true })
        const savedUser = await user.save()
        res.status(200).json({data:{message:'logged out'}, message:""})
    } catch (error) {
        res.status(500).json(error)
    }
}


