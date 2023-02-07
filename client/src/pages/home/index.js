
import React from 'react'
import Posts from '../../components/Posts';
import Share from '../../components/Share/share';
import Stories from '../../components/Stories';
import './home.scss';
function Home() {
  return (
    <div className='home'>
     <Stories/>
     <Share/>
        <Posts />
    </div>
  )
}

export default Home