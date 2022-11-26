import Image from "next/image";

const AdjustedImg = ({ children, ratio }) => {
	return (
		<div
			className="relative w-full overflow-hidden rounded-lg"
			style={{
				paddingBottom: `max(100px, ${ratio}%)`,
			}}
		>
			<div className="absolute w-full h-full">
				<div className="relative w-full h-full">
					<Image
						layout="fill"
						objectFit="cover"
                  className="absolute"
						src="/assets/cat.jpg"
					/>

               {children}
				</div>
			</div>
		</div>
	);
};

export default AdjustedImg;
