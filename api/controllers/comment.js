
import jwt from 'jsonwebtoken';
import moment from 'moment';
import {db} from '../connect.js';
export const getComments = (req,res) => {
    const q = "SELECT c.* ,u.profilePic , u.username FROM comments AS c JOIN users AS u ON (c.userId = u.id) WHERE c.postId = ?";
    db.query(q, [req.query.postId], (err,data) => {
        if(err) return res.status(404).json({
            message:"Error server",
            error:err
        })
        return res.json({
            message:"Get comments successful",
            postId : req.query.postId,
            comments:data
        });
    })
}


export const addComment = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({message:"Token is not valid"});
    const q = 'INSERT INTO comments(`description`,`createdAt`,`userId`,`postId`) VALUES(?)';
    jwt.verify(token , 'secret' , (err,userInfo) => {
        if(err) return res.status(500).json({message:"Error server" , error :err})
        const values = [
            req.body.description,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ]
        db.query(q,[values] , (err,data) => {
            if(err) return res.status(500).json({message:"Error server" , error :err})
            res.status(200).json({
                message:"Created comment successful",
                comment:data
            })
        })
    })
}