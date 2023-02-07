import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import httpsRequest from "../../api/axios";
import moment from "moment";
import { UserContext } from "../../context/authContext";
import "./comments.scss";

function Comments({ postId }) {
  
  const { currentUser } = useContext(UserContext);
  const [comments , setComments] = useState([]);
  const [description , setDescription] = useState("");
  const { isLoading, error, data } = useQuery("comments", () =>
    httpsRequest.get("/comments?postId="+postId).then((res) => {
      setComments(res.data.comments)
      return res.data;
    })
  );

  const queryClient = useQueryClient()
 
 const mutation = useMutation(
   (newComment) => {
    return  httpsRequest.post('/comments' , newComment)
   }, {
   onSuccess: () => {
    queryClient.invalidateQueries(['comments'])
   }
 })

 const handleClick = (e) => {
   e.preventDefault();
   mutation.mutate({description , postId})
   setDescription("");
 }

  return (
    <div className="comments">
      <div className="write">
        <Link to={`/profile/${currentUser.id}`}>
          <img src={"/upload/"+currentUser.profilePic} alt="" />{" "}
        </Link>

        <input type="text"  value={description} placeholder="Write a comment ..." onChange={e => setDescription(e.target.value)}/>
        <button onClick={handleClick}>send</button>
      </div>
      {error ?"Có lỗi gì đó đã xảy ra":isLoading ? "Loading...":comments.map((comment, index) => (
        <div key={index} className="comment">
          <Link to={`/profile/${comment.userId}`}>
            {" "}
            <img src={comment.profilePic} alt="" />
          </Link>
          <div className="info">
            <Link to={`/profile/${comment.userId}`}>
              <span>{comment.username}</span>
            </Link>
            <p>{comment.description}</p>
          </div>
          <div className="date">{moment(comment.createdAt).fromNow()}</div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
