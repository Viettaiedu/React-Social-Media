import express, { request } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import likeRoutes from './routes/likes.js';
import postRoutes from './routes/posts.js';
import relationshipRoutes from './routes/relationships.js';
import commentRoutes from './routes/comments.js';
import upload from './routes/upload.js';


const PORT = 8800;
app.use((req,res ,next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('strict-origin-when-cross-origin', "*");
    next();
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000"
}));



app.use('/api/auth', authRoutes);
app.use('/api/upload', upload);
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/relationships', relationshipRoutes);
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})