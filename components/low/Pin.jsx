import React, { useState } from "react";
import Image from "next/image";

const Pin = () => {
	const [paddingBot, setPaddingBot] = useState(150);

	return (
		<div className="pin">
			<div className="pin-img-container">
				<div
					className="pin-img"
					style={{ paddingBottom: `max(100px, ${paddingBot}%)` }}
				>
					<Image
						layout="fill"
						objectFit="cover"
                  src="/assets/cat.jpg"
						onLoadingComplete={e => {
							setPaddingBot(
								Math.floor((e.naturalHeight / e.naturalWidth) * 100)
							);
						}}
					/>
				</div>
			</div>

			<div className="pin-info"></div>
		</div>
	);
};

export default Pin;
