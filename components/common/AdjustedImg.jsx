import Image from "next/image";

const AdjustedImg = ({ children, ratio, src, scale }) => {
	return (
		<div
			className="relative w-full h-0"
			style={{
				paddingBottom: `clamp(${120*scale}px, ${ratio}%, ${500*scale}px)`,
			}}
		>
			<div className="absolute w-full h-full">
				<div className="relative w-full h-full">
					<Image
						layout="fill"
						objectFit="cover"
                  className="absolute"
                  alt="Image with preset ratio"
						src={src}
					/>
               {children}
				</div>
			</div>
		</div>
	);
};

export default AdjustedImg;
