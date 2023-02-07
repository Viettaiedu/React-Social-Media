

import React from 'react'
import { useQuery } from 'react-query'
import httpsRequest from '../../api/axios';
import Post from '../Post';
import './posts.scss';
function Posts({userId}) {
  const { isLoading, error, data } = useQuery('posts', () =>
      httpsRequest.get('/posts?userId='+userId)
        .then(res => {
          return res.data
        })
)
  return (
    <div className='posts'>
        {error ? "Có lỗi xảy ra khi truy cập":isLoading? "Loading...":data.map((post,index) => (
           <Post post={post} key={index}/>
        ))}
    </div>
  )
}

export default Posts