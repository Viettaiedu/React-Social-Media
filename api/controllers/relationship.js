import jwt from 'jsonwebtoken';
import {db} from '../connect.js';
export const getRelationships = (req,res)=> {
    const q = "SELECT followerUserId FROM relationships WHERE  followedUserId = ?";
    db.query(q, [req.query.followedUserId] , (err,data) => {
        if(err) return res.status(500).json({message:"Error server", error:err});
        res.status(200).json(data.map(relationship => relationship.followerUserId));
    })
}


export const addRelationship = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({message:"Token is not valid"});

    const q = "INSERT INTO relationships(`followerUserId`,`followedUserId`) VALUES(?)";

    jwt.verify(token , 'secret', (err,userInfo) => {
        if(err) return res.status(500).json({message:"Error server" , error: err});
        const values =[userInfo.id,req.body.followedUserId];
        db.query(q, [values] , (err,data) => {
            if(err) return res.status(401).json({message:"Error systax mysql", error : err})
            res.status(200).json(data);
        })
    })
}

export const deleteRelationship = (req,res) => {
    const token = req.cookies.accessToken;
   
    if(!token) return res.status(401).json({message:"Token is not valid"});
    const q = "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?";
    jwt.verify(token, 'secret', (err ,userInfo) => {
        if(err) return res.status(500).json({message:"Error server" , error: err});
        db.query(q , [userInfo.id,  req.query.followedUserId] , (err,data) => {
            if(err) return res.status(401).json({message:"Error systax mysql", error : err})
            
            res.status(200).json(data);
        })
    })
}