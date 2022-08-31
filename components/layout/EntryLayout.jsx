import React from "react";
import Head from "next/head";

const EntryLayout = ({ children }) => {
	return (
      <>
         <Head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>ChiSe</title>
         </Head>

         <div className="h-screen w-screen relative">
            <video
               src='/assets/chise.mp4'
               type="video/mp4"
               loop
               controls={false}
               autoPlay
               muted
               className="w-full h-full object-cover"
            />

            <div className="absolute top-0 right-0 left-0 bottom-0 grid laptop:grid-cols-2 bg-black-overlay">
               <div className="flex justify-center items-center">
                  <h1 className="text-[4rem] leading-[5rem] font-semibold text-white max-w-[26rem] laptop:text-left text-center">
                     New ideas made to be shared
                  </h1>
               </div>
               <div className="flex justify-center items-center">{children}</div>
            </div>
         </div>
      </>
   );
};

export default EntryLayout;
