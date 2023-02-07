
import { useContext, useState } from 'react';
import {UserContext} from '../../context/authContext';
import fakeImg from '../../assets/1.png';

import './share.scss';
import { useQueryClient , useMutation } from 'react-query';
import httpsRequest from '../../api/axios';
function Share() {
    const {currentUser} = useContext(UserContext);
    const [description , setDescription] = useState(null);
    const [file , setFile] = useState(null);

    const queryClient = useQueryClient();
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
          const {data} =  await  httpsRequest.post('/upload' , formData)
          return data.img
        }catch(err) {
            console.log("Error:",err);
        }
    }
    const mutation = useMutation(
        (newPost) => {
        return httpsRequest.post('/posts' , newPost)
    }
    ,{
        onSuccess : () => {
            queryClient.invalidateQueries('posts');
        }
    }
    )
    const handleClick = async (e) =>{
        e.preventDefault();
        let imgUrl =  "";
        if(file)  imgUrl = await upload()
            mutation.mutate({description , img : imgUrl})
        setDescription('')
        setFile(null);
    }
    console.log(currentUser)
    return ( 
    <div className="share">
           <div className='wrapper'>
           <div className="top">
               <div className="avatar">
                    <img src={"/upload/"+currentUser.profilePic} alt=""/>
               </div>
               <div className="message">
                    <input value={description} placeholder={`Bạn đang nghĩ gì vậy ${currentUser.name}?`} onChange={e => setDescription(e.target.value)}/>
               </div>
            </div>
            <div className="bottom">
               <div>
               <input type="file" id='file' hidden onChange={e => setFile(e.target.files[0])}/>
               <label htmlFor='file'>
               <p>
                    <img src={fakeImg} alt=""/>
                    <span>Add image</span>
                </p>

               </label>
                <p>
                    <img src={fakeImg} alt=""/>
                    <span>Add place</span>
                </p>
                <p>
                    <img src={fakeImg} alt=""/>
                    <span>Tags Friends</span>
                </p>
               </div>
               <div>
                   <button onClick={handleClick}>Share</button>
               </div>
            </div>
           </div>
            <div className='file'>
                 {file && <img  src={URL.createObjectURL(file)} alt='' />}   
            </div>
    </div>  );
}

export default Share;