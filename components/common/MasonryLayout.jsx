import { useEffect, useState } from "react";
import { Firestore } from "../../services";
import MoreLoader from "../loader/MoreLoader";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const MasonryLayout = ({ pins, setPins }) => {
   const [isLoadingMore, setIsLoadingMore] = useState(false);
   const [noMorePin, setNoMorePin] = useState(false);

   const breakpoints = {
      default: 7,
      1820: 6,
      1560: 5,
      1300: 4,
      1040: 3,
      780: 2,
      520: 1
   }

   useEffect(() => {
      async function scrollBottom() {
         const isBottom = document.body.getBoundingClientRect().bottom === window.innerHeight;
         const lastCreatedAt = pins[pins.length - 1].createdAt;

         if (isBottom) {
            const q = Firestore.queryPinsAfter(lastCreatedAt);
            setIsLoadingMore(true);
            document.removeEventListener("scroll", scrollBottom);

            await Firestore.getPinsByQuery(q).then((morePins) => {
               if (morePins.length) {
                  setPins((prev) => ([
                     ...prev,
                     ...morePins,
                  ]));
                  
                  document.addEventListener("scroll", scrollBottom);
               }

               setIsLoadingMore(false);
            });
         }
      }

      document.addEventListener("scroll", scrollBottom);

      if (pins.length < 42) {
         setNoMorePin(true);
         document.removeEventListener("scroll", scrollBottom);
      }

      return () => document.removeEventListener("scroll", scrollBottom);
   }, [pins]);

	return (
      <>
         <Masonry
            breakpointCols={breakpoints}
            className="flex justify-center"
            columnClassName="max-w-[260px] bg-clip-padding"
         >
            {pins.map((pin, id) => (
               <Pin pin={pin} key={id} />
            ))}
         
         </Masonry>

         <MoreLoader isLoadingMore={isLoadingMore} noMorePin={noMorePin} />
      </>
	);
};

export default MasonryLayout;
