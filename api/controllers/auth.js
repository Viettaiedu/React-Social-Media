import {db} from '../connect.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = (req,res) => {
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q , [req.body.username,req.body.email] , (err,data) => {
        if(err) return res.status(500).json({message:"Error server" , error: err});
        if(data.length) {
            return res.status(404).json({message:"Username or email exist" , username : req.body.username});
        }
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(req.body.password,salt);
        const q = "INSERT INTO users(`username`,`email`,`password`,`name`) VALUES(?)"
            const values = [req.body.username , req.body.email , hashPassword , req.body.name]
            db.query(q,[values], (err,data) => {
                if(err) return res.status(500).json({message:"Error server" , error: err});
                return res.status(200).json({
                    message:"User created successfully",
                    user : data
                })
            })
    })
}

export const login = (req,res) => {
    
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username] , (err,data) => {
        if(err) return res.status(500).json({message:"Error server" , error : err});
        if(data.length === 0) return res.status(404).json({message:"User not found"})
        const checkPassWord = bcryptjs.compareSync( req.body.password ,data[0].password);
        if(!checkPassWord) return res.status(404).json({message:"Password incorrect"})

        const token = jwt.sign({id : data[0].id} , 'secret');
        const {password , ...others} = data[0];
        res.cookie("accessToken" ,token , {
            httpOnly :true,
        } ).status(200).json({
            information : others
        });
    })
}
export const logout = (req,res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json({message:"User has been logged out."})
  
}
