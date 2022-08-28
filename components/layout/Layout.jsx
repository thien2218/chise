import React from 'react'
import Sidebar from '../high/Sidebar';
import Header from '../high/Header';

const Layout = ({ children, home }) => {
   return (
      <>
         <Header />
         {home ? (
            <>
               <Sidebar />
               <main className='pt-[80px] pl-[270px]'>
                  {children}
               </main>
            </>
         ) : (
            <main className='pt-[80px]'>
               {children}
            </main>
         )}
         
      </>
   )
}

export default Layout