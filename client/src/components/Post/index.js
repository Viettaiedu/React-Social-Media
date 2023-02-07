import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import "./post.scss";
import Comments from "../Comments";
import moment from "moment";
import { useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import httpsRequest from "../../api/axios";
import { UserContext } from "../../context/authContext";
function Post({ post }) {
  const [openComments, setOpenComments] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [likes, setLikes] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    httpsRequest.get("/likes?postId=" + post.id).then((res) => {
      setLikes(res.data);
      return res.data;
    })
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newLike) => {
      return httpsRequest.post("/likes", newLike);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteLikeMutation = useMutation(
    (value) => {
     return   httpsRequest.delete('/likes' , value)
    },
   {
    onSuccess : ()=> {
        queryClient.invalidateQueries(['likes']);
    }
   }
  )
  const handleLike =  () => {
    if(likes.includes(currentUser.id)) return  deleteLikeMutation.mutate({data : {userId : currentUser.id , postId:post.id}})
     mutation.mutate({userId : currentUser.id , postId:post.id})
  }

  const deletePostMutation = useMutation(
    (postId) => {
      return httpsRequest.delete('/posts/'+postId)
    }, {
      onSuccess : () => {
        queryClient.invalidateQueries('posts')
      }
    }
  ) 
  const hanldeDeletePost = () => {
    deletePostMutation.mutate(post.id);
    setOpenOption(false);
  }
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link to={`/profile/${post.userId}`}>
              {" "}
              <img src={"/upload/"+post.profilePic} alt="" />
            </Link>
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <p>{post.name}</p>
              </Link>
              <span>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
                <div className="option">
                    {openOption  && currentUser.id === post.userId ? <button onClick={hanldeDeletePost}>Delete</button> :  <MoreHorizIcon onClick={() => setOpenOption(true)}/> }  
                </div>
        </div>
        <div className="content">
          <span>{post.description}</span>
          <img src={"/upload/" +post.img} alt="" />
        </div>
        <div className="info">
          <span onClick={handleLike}>
            {likes.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}{" "}
            {likes.length} Likes
          </span>
          <span onClick={() => setOpenComments(!openComments)}>
            {" "}
            <TextsmsOutlinedIcon /> See Comments
          </span>
          <span>
            {" "}
            <ShareOutlinedIcon /> Share
          </span>
        </div>
      </div>
      {openComments && <Comments postId={post.id} />}
    </div>
  );
}

export default Post;
