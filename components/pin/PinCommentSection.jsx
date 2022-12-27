import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoArrowForwardCircle } from "react-icons/io5";
import Avatar from "../common/Avatar";
import PinComment from "./PinComment";

const PinCommentSection = ({ comments }) => {
	const [showComments, setShowComments] = useState(true);

	return (
		<div className="pr-3">
			<div className="mt-8">
				<button
					className="text-2xl font-semibold flex items-center gap-1"
					onClick={() => setShowComments(!showComments)}
				>
					<span className="text-xl">Comments</span>
					{showComments ? <IoIosArrowDown /> : <IoIosArrowUp />}
				</button>

				<div className="py-4">
					<div className="relative flex gap-2">
						<Avatar size={10} src="/assets/cat.jpg" />

						<div
							contentEditable
							className="relative flex-1 max-w-[calc(100%_-_3rem)] pr-10 empty:before:content-[attr(placeholder)] empty:before:text-dark-gray cursor-text py-2 px-3.5 rounded-full shadow-[0_0_0_1.5px_inset] shadow-dimmed-700 focus:outline-none focus:shadow-blueish focus:rounded-2xl"
							placeholder="Add a comment"
						/>

                  <div className="absolute h-10 aspect-square flex-center right-0">
                     <button className="text-4xl text-primary hover:text-primary-hover">
                        <IoArrowForwardCircle />
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
