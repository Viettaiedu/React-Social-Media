import "./update.scss";
import react, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import httpsRequest from "../../api/axios";
import { UserContext } from "../../context/authContext";
function Update({ setShowUpdate }) {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const {setCurrentUser , currentUser} = useContext(UserContext);
  const [inputs, setInputs] = useState({
    name: "",
    city: "",
    website: "",
  });
  const clientQuery = useQueryClient();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const upload =  async (file)  => {
      const formData = new FormData();
      try {
        formData.append('file',file);
        const {data} = await httpsRequest.post('/upload', formData);
        return data.img
      }catch (err){
        console.log(err);
      }
  }
  const mutation = useMutation(
    (valueUpdate) =>
      httpsRequest.put("/users", valueUpdate).then((res) => res.data),
    {
      onSuccess: () => {
        clientQuery.invalidateQueries("users");
      },
    }
  );

  const handleUpdate =  async (e) => {
     e.preventDefault();
    let coverUrl = cover && await upload(cover);
    let profileUrl = profile && await upload(profile);
    const userUpdate = {
        name: inputs.name,
        city: inputs.city,
        website: inputs.website,
        coverPic: coverUrl,
        profilePic: profileUrl,
       id :currentUser.id
      }
    mutation.mutate(userUpdate);
    setShowUpdate(false);
    setCurrentUser(userUpdate)
  };
  return (
    <div className="update">
      <form>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
        <input type="text" name="website" onChange={handleChange} />
        <button onClick={handleUpdate}>Update</button>
      </form>
      <button onClick={() => setShowUpdate(false)}>X</button>
    </div>
  );
}

export default Update;
