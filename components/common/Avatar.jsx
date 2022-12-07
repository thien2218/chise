import Image from "next/image";

const Avatar = ({ size, src }) => {
	return (
		<div className={`relative h-${size} aspect-square rounded-full overflow-hidden`}>
			<Image src={src} objectFit="cover" layout="fill" />
		</div>
	);
};

export default Avatar;
