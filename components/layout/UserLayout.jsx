import UserInfo from '../low/UserInfo';
import MasonryLayout from './MasonryLayout';

const UserLayout = ({ children }) => {
   return (
      <>
         <UserInfo viewOthers />

         <div className='flex justify-center'>
            <div className='py-3 mx-2'>
               <button className='p-2 font-semibold rounded-lg hover:bg-dimmed-500'>Created</button>
            </div>
            <div className='py-3 mx-2'>
               <button className='p-2 font-semibold rounded-lg hover:bg-dimmed-500'>Saved</button>
            </div>
         </div>

         <MasonryLayout>
            {children}
         </MasonryLayout>
      </>
   )
}

export default UserLayout;