
import { useContext } from 'react';
import { UserContext } from '../../context/authContext';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import './stories.scss';
function Stories() {
    const {currentUser} = useContext(UserContext);
   //TEMPORARY
  const stories = [
    {
      id: 1,
      userName: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      userName: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      userName: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      userName: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];
  return (
    <div className='stories'>
        <div  className="story">
            <img src={"/upload/"+currentUser.profilePic} alt={currentUser.name}/>
           <small><AddCircleOutlineOutlinedIcon/></small>
            <span>
                {currentUser.name}
            </span>
        </div>
        {stories.map((story,index) => (
        <div key={index} className="story">
            <img src={story.img} alt={story.userName}/>
            <span>{story.userName}</span>
        </div>
        ))
        }
    </div>
  )
}

export default Stories;