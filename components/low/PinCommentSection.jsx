import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const PinCommentSection = ({ comments }) => {
	const [showComments, setShowComments] = useState(true);

	return (
		<div className="pr-3">
			<div className="mt-8">
				<div className="flex items-center">
					<span className="text-xl font-semibold mr-1">Comments</span>
					<div onClick={() => setShowComments(!showComments)}>
						{showComments ? (
							<ChevronDownIcon className="h-10 w-10 p-2 cursor-pointer font-bold hover:bg-dimmed-500 rounded-full" />
						) : (
							<ChevronRightIcon className="h-10 w-10 p-2 cursor-pointer font-bold hover:bg-dimmed-500 rounded-full" />
						)}
					</div>
				</div>

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
