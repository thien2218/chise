import React from 'react';

const Pin = ({ id }) => {
   return (
      <div className='pin'>
         <div className='pinImg'>
            <img className='object-cover w-full' src='/images/cat.jpg' />
         </div>

         <div className="pinInfo"></div>
      </div>
   )
}

export default Pin