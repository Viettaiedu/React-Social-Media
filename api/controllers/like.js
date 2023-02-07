
import {db} from '../connect.js';
import jwt from 'jsonwebtoken';
export const getLikes = (req , res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    db.query(q,[req.query.postId] , (err,data) => {
        if(err) return res.status(404).json({message:"Query error", error :err})
        res.status(201).json(data.map(like => like.userId));
    })
}
export const addLike = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json({message:"Token is not valid", error: err})
    const q = "INSERT INTO likes (`userId`,`postId`) VALUES(?)"
    jwt.verify(token ,'secret', (err,userInfo) => {
        if(err) return res.status(500).json({message:"Server error", error: err})
        const values = [
            userInfo.id , req.body.postId
        ]
        db.query(q,[values] , (err,data) => {
            if(err) return res.status(404).json({message:"Query error", error :err})
             res.status(200).json({message:"Like has been liked", data , postId :req.body.postId})
        })
    })
}

export const deleteLike = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json({message:"Token is not valid", error: err})
    const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";

    jwt.verify(token ,'secret', (err,userInfo) => {
        if(err) return res.status(500).json({message:"Server error", error: err})
        db.query(q,[userInfo.id,  req.body.postId ] , (err,data) => {
            if(err) return res.status(404).json({message:"Query error", error :err})
             res.status(200).json({message:"Deleted successfully", data , postId :req.body.postId})
        })
    })
}