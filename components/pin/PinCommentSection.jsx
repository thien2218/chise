import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProfileImg from "../common/ProfileImg";
import PinComment from "./PinComment";

const PinCommentSection = ({ comments }) => {
	const [showComments, setShowComments] = useState(true);
   const [comment, setComment] = useState("");

   const handleComment = (e) => {
      const { value } = e.target;
      setComment(value.trim());
   }

	return (
		<div className="pr-3">
			<div className="mt-8">
				<button
					className="text-2xl font-semibold flex items-center gap-1"
					onClick={() => setShowComments(!showComments)}
				>
					<span className="text-xl">Comments</span>

               <div className="h-8 aspect-square rounded-full flex-center hover:bg-dimmed-500">
                  {showComments ? <IoIosArrowDown /> : <IoIosArrowUp />}
               </div>
				</button>

				<div className="py-4">
					<div className="relative flex flex-wrap gap-2">
						<ProfileImg size={10} profileUrl="/assets/cat.jpg" />

						<div
							contentEditable
							className="relative flex-1 max-w-[calc(100%_-_3rem)] empty:before:content-[attr(placeholder)] empty:before:text-dark-gray cursor-text py-2 px-3.5 rounded-full shadow-[0_0_0_1.5px_inset] shadow-dimmed-700 focus:outline-none focus:shadow-blueish focus:rounded-2xl peer"
							placeholder="Add a comment"
                     onChange={handleComment}
						/>

                  <div className="flex-[0_0_100%] justify-end hidden peer-focus:flex">
                     <button className={`${comment ? "primary-btn" : "disabled-btn"} py-2 px-3 font-normal rounded-full`}>
                        Done
                     </button>
                  </div>
					</div>

					{showComments && (
						<div className="flex flex-col gap-2 mt-6 h-max max-h-96 overflow-y-scroll">
							<PinComment />
							<PinComment />
							<PinComment />
							<PinComment />
							<PinComment />
							<PinComment />
							<PinComment />
							<PinComment />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PinCommentSection;
