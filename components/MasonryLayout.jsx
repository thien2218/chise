import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import Masonry from "react-masonry-css";

const MasonryLayout = ({ children }) => {
   const masonryRef = useRef(null);
   const [width, setWidth] = useState(0);

   useLayoutEffect(() => {
      const updateWidth = () => setWidth(masonryRef.current.offsetWidth);
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
   }, [])

   const cols = Math.floor(width / 266);

   return (
      <div ref={masonryRef}>
         <Masonry
            breakpointCols={cols > 2 ? cols : 2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
         >
            {children}
         </Masonry>
      </div>
   )
}

export default MasonryLayout;