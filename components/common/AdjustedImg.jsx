import { useState } from "react";
import Image from "next/image";

const AdjustedImg = ({ children, ratio }) => {
   return (
      <div className="absolute w-full" style={{
         paddingBottom: `max(100px, ${ratio}%)`
      }}>
         <div className="w-full h-full">

         </div>
      </div>
   )
}

export default AdjustedImg