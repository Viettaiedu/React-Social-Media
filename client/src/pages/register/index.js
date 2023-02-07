
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import httpsRequest from '../../api/axios';
import './register.scss';
function Register() {
    const [err , setErr] = useState(null);
    const [inputs , setInputs] = useState({
        username:"",
        email:"",
        password:"",
        name:""
    });
    const handleChange = (e) => {
        setInputs((prev) => ({...prev ,[e.target.name]: e.target.value }))
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if(!(inputs.username && inputs.email &&  inputs.password && inputs.name)) return setErr("Vui long nhap day du thong tin");
       const {data} = await httpsRequest.post('/auth/register',inputs);
       setErr(data.message);
    }
  return (
    <div className='register'>
        <div className='cart'>
            <div className='left'>
                <h1>Lama Social</h1>
                <p>Lorem.teti r ipsum eu, pharetra mauris. Nam id arcu et justo dictum viverra consectetur et velit.</p>
                <span>Do you have account?</span>
                <Link to="/login">Login</Link>
            </div>
            <div className='right'>
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <input type="name" placeholder="Name" name="name" onChange={handleChange}/>

                    {err && <p>{err}</p>}
                    <button onClick={handleClick}>Register</button>
                </form>
            </div>
        </div>
    </div>
  )
}
export default Register;