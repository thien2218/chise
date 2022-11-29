import Image from 'next/image';
import Link from 'next/link';
import ActionBtn from "../common/ActionBtn";

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

			<ActionBtn action="Follow" classes="secondary-btn rounded-full" />
		</div>
	);
};

export default PinUserInfo;
