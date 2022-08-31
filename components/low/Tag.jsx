import React from 'react'

const Tag = ({ tagName }) => {
   return (
      <span className='py-1 px-2 inline-block rounded-2xl mr-1 mb-1 text-sm bg-dimmed-400'>
         <div className='flex gap-1 items-center'>
            {tagName}
         </div>
      </span>
   )
}

export default Tag