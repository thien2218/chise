import React from 'react';

const Post = ({ id }) => {
   return (
      <div className='post'>
         <div className='postImg'>
            <img className='object-cover w-full' src='/images/cat.jpg' />
         </div>

         <div className="postInfo"></div>
      </div>
   )
}

export default Post