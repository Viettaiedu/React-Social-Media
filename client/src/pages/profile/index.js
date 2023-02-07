import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";
import Posts from "../../components/Posts";
import {  useMutation, useQuery, useQueryClient } from "react-query";
import httpsRequest from "../../api/axios";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/authContext";
import Update from "../../components/Update";
function Profile() {
  const { id } = useParams();
  const [showUpdate , setShowUpdate] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { isLoading, data } = useQuery("users", () =>
    httpsRequest.get("/users/find/" + id).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    'relationships',
    () =>
      httpsRequest.get("/relationships?followedUserId=" + id).then((res) => {
        return res.data;
      })
  );

  const mutation = useMutation((addFollow) => {
    if(relationshipData.includes(currentUser.id))  {
      return httpsRequest.delete('/relationships?followedUserId='+ id);
    }
    else {
      return httpsRequest.post('/relationships' ,addFollow)
    }
  }, {
    onSuccess : () => {
      queryClient.invalidateQueries('relationships')
    }
  })
  const handleFollow = () => {
    mutation.mutate({followedUserId : id})
  }
  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="images">
           {isLoading ? "":<img src={"/upload/"+data.coverPic} alt="" /> } 
            <div className="uProfilePic">
              <img src={"/upload/"+data.profilePic} alt="" />
              <span>{data.name}</span>
            </div>
          </div>
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <PinterestIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{data.city}</span>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <span>{data.website}</span>
                </div>
              </div>
              {currentUser.id === parseInt(id) ? (
                <button onClick={() => setShowUpdate(true)}>update</button>
              ) : rIsLoading ? (
                "Loading..."
              ) : currentUser.id === relationshipData[0] ? (
                <button onClick={handleFollow}>Hủy theo dõi</button>
              ) : (
                <button onClick={handleFollow}>theo dõi</button>
              )}
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
        </>
      )}

      <Posts userId={parseInt(id)} />
      {showUpdate && <Update  setShowUpdate={setShowUpdate}/>}
    </div>
  );
}

export default Profile;
