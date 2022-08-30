import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const PinUserInfo = ({ img, username }) => {
	return (
		<div className="mt-4 flex items-center pr-3">
			<div className="mx-1 rounded-full overflow-hidden h-12 w-12 relative">
				<Link href="/" className="">
					<a>
						<Image
							src={img}
							objectFit="cover"
							layout="fill"
						/>
					</a>
				</Link>
			</div>

			<div className="flex-1 pl-1 font-semibold">
				<Link href="/">
					<a>{username}</a>
				</Link>
			</div>

			<button className="secondary-btn rounded-2xl py-3 px-4 font-semibold">
				Follow
			</button>
		</div>
	);
};

export default PinUserInfo;
