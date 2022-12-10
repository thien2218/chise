import Image from "next/image";

const Avatar = ({ size, src }) => {
	const h = size * 0.25;
	return (
		<div
			className={`relative aspect-square rounded-full overflow-hidden`}
			style={{
				height: `${h}rem`,
			}}
		>
			<Image src={src} objectFit="cover" layout="fill" />
		</div>
	);
};

export default Avatar;
