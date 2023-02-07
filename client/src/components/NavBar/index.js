

import React, { useContext } from 'react'
import './navBar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';
import DarkModeOutlined  from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import SearchOffOutlined from '@mui/icons-material/SearchOffOutlined';
import PersonSearchOutlined  from '@mui/icons-material/PersonSearchOutlined';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import NotificationsOutlined  from '@mui/icons-material/NotificationsOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import { UserContext } from '../../context/authContext';
function NavBar() {
  const {darkMode , toggleDarkMode} = useContext(DarkModeContext);
  const {currentUser } = useContext(UserContext);
  return (
    <div className='navbar'>
      <div className='left'>
        <Link to="/" style={{textDecoration:"none"}}>
          <span>lamasocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? <WbSunnyOutlinedIcon onClick={toggleDarkMode}/>:   <DarkModeOutlined onClick={toggleDarkMode}/>}
        <GridViewOutlined/>
        <div className='search'>
          <SearchOffOutlined />
          <input type="text" placeholder="Search..."/>
        </div>
      </div>
      <div className='right'>
        <PersonSearchOutlined />
        <EmailOutlined />
        <NotificationsOutlined />
        <div className="user">
          <img src={"/upload/"+currentUser.profilePic} alt={currentUser.name}/>
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default NavBar