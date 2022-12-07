import UserInfo from '../user/UserInfo';
import MasonryLayout from './MasonryLayout';

const UserLayout = () => {
   return (
      <>
         <UserInfo />

         <div className='flex justify-center'>
            <div className='py-3 mx-2'>
               <button className='p-2 font-semibold rounded-lg hover:bg-dimmed-500'>Created</button>
            </div>
            <div className='py-3 mx-2'>
               <button className='p-2 font-semibold rounded-lg hover:bg-dimmed-500'>Saved</button>
            </div>
         </div>

         <MasonryLayout />
      </>
   )
}

export default UserLayout;