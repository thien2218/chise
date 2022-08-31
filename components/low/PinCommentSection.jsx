import React, { useState } from "react";

const PinCommentSection = ({ comments }) => {
	const [showComments, setShowComments] = useState(true);

	return (
		<div className="pr-3">
			<div className="mt-8">
				<div className="flex items-center">
					<span className="text-xl font-semibold mr-1">Comments</span>
					<div onClick={() => setShowComments(!showComments)}>
						
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
