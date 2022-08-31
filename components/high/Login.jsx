import React from 'react'

const Login = () => {
   return (
      <form className='form'>
         <h1 className='text-[2rem] heading text-center mb-4'>Welcome to ChiSe</h1>
      
         <div className='form-field mb-2'>
            <label className='form-label' for="username">Username</label>
            <input className='form-input' autoComplete='off' id="username" name="username" type="text" placeholder="Create a username" />
            <span className='form-message'></span>
         </div>
      
         <div className='form-field mb-2'>
            <label className='form-label' for="password">Password</label>
            <input className='form-input' autoComplete='off' id="password" name="password" type="password" placeholder="Create a password" />
            <span className='form-message'></span>
         </div>
      
         <button className="primary-btn w-full py-2 px-4 rounded-2xl mt-4">Log In</button>
         <p className='my-2 font-bold text-sm text-center'>OR</p>
         <button className="primary-btn w-full py-2 px-4 rounded-2xl">Continue with Google</button>
      </form>
   )
}

export default Login