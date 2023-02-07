
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/authContext';
import './login.scss';

function Login() {
    const navatige = useNavigate();
    const {login} = useContext(UserContext);
    const [err , setErr] = useState(null);
    const [inputs , setInputs] = useState({
        username:"",
        password:"",
    });
   
    const handleLogin = async (e) => {
        e.preventDefault();
        if(!(inputs.username && inputs.password)) return setErr("Sai sot khi dang nhap");
       try {
         await login(inputs);
            navatige('/');
       } catch(err) {
        console.log(err);
       }
    }
    const handleChange = (e) => {
        setInputs((prev) => ({...prev ,[e.target.name]: e.target.value }))
    }
  return (
    <div className='login'>
        <div className='cart'>
            <div className='left'>
                <h1>Hello world!</h1>
                <p>Lorem.teti r ipsum eu, pharetra mauris. Nam id arcu et justo dictum viverra consectetur et velit.</p>
                <span>Don`t you have account?</span>
                <Link to="/register" >Register</Link>
            </div>
            <div className='right'>
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    {err && <p>{err}</p>}
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login;