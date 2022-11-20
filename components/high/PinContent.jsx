import React from 'react';
import PinImg from '../low/PinImg';
import PinActions from '../low/PinActions';
import PinTextContent from '../low/PinTextContent';
import PinUserInfo from '../low/PinUserInfo';
import PinCommentSection from '../low/PinCommentSection';

const PinDetail = () => {
   return (
      <article>
         <div className="py-6 mx-auto w-full lg:max-w-[64rem] max-w-[32rem]">
            <div className="rounded-[2rem] bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] grid lg:grid-cols-2">
               <PinImg img='/assets/cat.jpg' />

               <div className="p-5 flex flex-col">
                  <PinActions />
                  <PinTextContent />
                  <PinUserInfo img='/assets/cat.jpg' username='Thien Huynh' />
                  <PinCommentSection />
               </div>
            </div>
         </div>
      </article>
   )
}

export default PinDetail