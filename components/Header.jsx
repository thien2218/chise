import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
   return (
      <header className='fixed w-full top-0 left-0'>
         <nav className="flex h-[80px] items-center px-4">
            <Link href='/'>
               Home
            </Link>
         </nav>
      </header>
   )
}

export default Header