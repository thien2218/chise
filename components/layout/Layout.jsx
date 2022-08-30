import React from 'react'
import Sidebar from '../high/Sidebar';
import Header from '../high/Header';
import Head from 'next/head';

const Layout = ({ children, home, title }) => {
   return (
      <>
         <Head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
         </Head>

         <Header />

         {home ? (
            <>
               <Sidebar />
               <main className='pt-[5rem] pl-[17.5rem]'>
                  {children}
               </main>
            </>
         ) : (
            <main className='pt-[5rem]'>
               {children}
            </main>
         )}
         
      </>
   )
}

export default Layout