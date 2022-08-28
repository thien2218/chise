import React from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid';

const Tag = ({ tagName }) => {
   return (
      <span className='py-1 px-2 inline-block rounded-2xl mr-1 mb-1 text-[14px] bg-gray-200'>
         <div className='flex gap-1 items-center'>
            {tagName}
            <XCircleIcon className='h-5 w-5 cursor-pointer text-gray-400' />
         </div>
      </span>
   )
}

export default Tag