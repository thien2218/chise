import Image from "next/image";

const AdjustedImg = ({ children, ratio, src }) => {
	return (
		<div
			className="relative w-full overflow-hidden rounded-lg h-0"
			style={{
				paddingBottom: `max(120px, ${ratio}%)`,
			}}
		>
			<div className="absolute w-full h-full">
				<div className="relative w-full h-full">
					<Image
						layout="fill"
						objectFit="cover"
                  className="absolute"
						src={src}
					/>
               {children}
				</div>
			</div>
		</div>
	);
};

export default AdjustedImg;
