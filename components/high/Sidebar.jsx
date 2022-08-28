import React from 'react'
import Tag from '../low/Tag'

const Sidebar = () => {
   return (
      <div className='fixed top-[80px] left-0 w-[280px] h-[calc(100vh_-_80px)]'>
         <div className='py-2 px-4 flex flex-col flex-wrap h-full'>
            <form className='w-full relative flex items-center'>
               <input className='w-full px-3 py-2 rounded-lg input-bg' type="text" placeholder='Your interest...' />
               <button className='py-2 px-4 primary-btn absolute rounded-lg right-0'>Add</button>
            </form>

            <h1>Interest Tags</h1>

            <div className="tags w-full overflow-y-scroll h-full flex-1">
               <Tag tagName='Animal' />
               <Tag tagName='Fashion' />
               <Tag tagName='Books' />
               <Tag tagName='Travel' />
               <Tag tagName='Technology' />
               <Tag tagName='Anime' />
               <Tag tagName='Art' />
               <Tag tagName='Handcraft' />
               <Tag tagName='Sport' />
            </div>
         </div>
      </div>
   )
}

export default Sidebar