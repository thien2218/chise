import React from "react";

const PinImg = ({ img }) => {
	return (
		<div className="h-full">
			<div className="laptop:p-5 h-max">
				<div className="laptop:rounded-2xl rounded-t-2xl overflow-hidden relative">
					<img src={img} />
				</div>
			</div>
		</div>
	);
};

export default PinImg;
