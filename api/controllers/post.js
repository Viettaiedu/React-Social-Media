
import {db} from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getPosts = (req,res) => {
    let userId = parseInt(req.query.userId) || undefined;
    let q = 
    `SELECT p.* , name , profilePic  FROM posts AS p JOIN users AS u ON (p.userId = u.id) LEFT JOIN relationships AS r ON (r.followedUserId = p.userId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC;` 
    if(userId) {
       q = `SELECT p.* , name , profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) WHERE p.userId = ? ORDER BY p.createdAt DESC `;
    }
    const token = req.cookies.accessToken;
    if(!token) return res.status(404).json({message:"Token is not valid"});
    jwt.verify(token, 'secret' , (err , userInfo) => {
        db.query(q , userId ? [userId]: [userInfo.id,userInfo.id] , (err,data) => {
            return res.json(data);
        })
    })
}


export const addPost = (req,res) => {
    const q = "INSERT INTO posts (`description`,`img`,`userId`,`createdAt`) VALUES(?);";
    const token = req.cookies.accessToken;
    if(!token)  return res.status(404).json({message:"Token is not valid"});
    jwt.verify(token,'secret' , (err,userInfo) => {
        const values = [
            req.body.description,
            req.body.img,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        db.query(q , [values] , (err,data) => {
            if(err) {
                return res.status(500).json({message:"Error server" , error :err})
            }
            return res.status(200).json(data)
        })
    })
}

export const deletePost = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token)  return res.status(404).json({message:"Token is not valid"});
    jwt.verify(token,'secret' , (err,userInfo) => {
       const q = "DELETE FROM posts WHERE id = ? AND userId = ?";
        db.query(q , [req.params.id,userInfo.id] , (err,data) => {
            if(err) {
                return res.status(500).json({message:"Error server" , error :err})
            }
            if(data.affectedRows > 0) return res.status(200).json({message:"Delete has post been"})
            return res.status(404).json({message:"You can delete only post"});
        })
    })
}

