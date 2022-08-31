import React from 'react';
import Link from 'next/link';

const SignUp = () => {
   return (
      <form className='form'>
         <h1 className='text-[2rem] heading text-center mb-4'>Welcome to ChiSe</h1>
      
         <div className='form-field mb-2'>
            <label className='form-label' for="username">Username</label>
            <input className='form-input' autoComplete='off' id="username" name="username" type="text" placeholder="Create a username" />
            <span className='form-message'></span>
         </div>
      
         <div className='form-field mb-2'>
            <label className='form-label' for="email">Email</label>
            <input className='form-input' autoComplete='off' id="email" name="email" type="email" placeholder="example@domain.com" />
            <span className='form-message'></span>
         </div>
      
         <div className='form-field mb-2'>
            <label className='form-label' for="password">Password</label>
            <input className='form-input' autoComplete='off' id="password" name="password" type="password" placeholder="Create a password" />
            <span className='form-message'></span>
         </div>
      
         <div className='form-field mb-2'>
            <label className='form-label' for="password_confirmation">Confirm password</label>
            <input className='form-input' autoComplete='off' id="password_confirmation" name="password_confirmation" placeholder="Confirm your password" type="password" />
            <span className='form-message'></span>
         </div>
      
         <button className="primary-btn w-full py-2 px-4 rounded-2xl mt-4">Continue</button>
         <p className='my-2 font-semibold text-sm text-center'>OR</p>
         <button className="primary-btn w-full py-2 px-4 rounded-2xl">Continue with Google</button>
         
         <div className='font-semibold mt-4 text-center text-sm'>
            <Link href='/login'><a>
               Already a member? Log in
            </a></Link>
         </div>
      </form>
   )
}

export default SignUp