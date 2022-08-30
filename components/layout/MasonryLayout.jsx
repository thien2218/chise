import React, { useLayoutEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";

const MasonryLayout = ({ children }) => {
   const masonryRef = useRef(null);
   const [width, setWidth] = useState(0);

   useLayoutEffect(() => {
      const updateWidth = () => setWidth(masonryRef.current.offsetWidth);
      window.addEventListener('resize', updateWidth);
      updateWidth();
      return () => window.removeEventListener('resize', updateWidth);
   }, [])

   const cols = Math.floor(width / 266);

   return (
      <div ref={masonryRef}>
         <Masonry
            breakpointCols={cols > 2 ? cols : 2}
            className="flex justify-center"
            columnClassName="max-w-[266px] bg-clip-padding"
         >
            {children}
         </Masonry>
      </div>
   )
}

export default MasonryLayout;