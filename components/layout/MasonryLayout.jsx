import { useLayoutEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import Pin from "../common/Pin";

const MasonryLayout = () => {
   const masonryRef = useRef(null);
   const [width, setWidth] = useState(0);

   useLayoutEffect(() => {
      const updateWidth = () => setWidth(masonryRef.current.offsetWidth);
      window.addEventListener('resize', updateWidth);
      updateWidth();
      return () => window.removeEventListener('resize', updateWidth);
   }, [])

   const cols = Math.floor(width / 260);
   const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

   return (
      <div ref={masonryRef}>
         <Masonry
            breakpointCols={cols > 0 ? cols : 1}
            className="flex justify-center"
            columnClassName="max-w-[260px] bg-clip-padding"
         >
            {arr.map((num) => (
               <Pin key={num} />
            ))}
         </Masonry>
      </div>
   )
}

export default MasonryLayout;