import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const PinCommentSection = ({ comments }) => {
	const [showComments, setShowComments] = useState(true);

	return (
		<div className="pr-3">
			<div className="mt-8">
            <button className="text-2xl font-semibold flex items-center gap-1" onClick={() => setShowComments(!showComments)}>
               <span className="text-xl">Comments</span>
               {showComments ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>

				<div className="py-4">
               {showComments && (
                  <div className="flex">
                     Comments
                  </div>
               )}
            </div>
			</div>
		</div>
	);
};

export default PinCommentSection;
