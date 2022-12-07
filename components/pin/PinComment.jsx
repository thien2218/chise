import Avatar from "../common/Avatar";
import Link from "next/link";

const PinComment = () => {
	return (
		<div className="grid grid-cols-[40px_1fr]">
			<Avatar size={8} src="/assets/cat1.jpg" />

			<div>
				<div>
					<Link href="/">
						<a className="font-semibold flex-1 mr-1.5">Thien Huynh</a>
					</Link>
					<span>Hello, World!Hello, World!Hello, World!Hello, World!Hello,
					World!Hello, World!Hello, World!Hello, World!Hello, World!Hello,
					World!Hello, World!Hello, World!Hello, World!Hello, World!Hello,
					World!</span>
				</div>

            <div className="flex gap-4 text-sm">
               <span className="text-black/40">1d</span>
               <span className="font-semibold text-dark-gray">Like</span>
               <span className="font-semibold text-dark-gray">Report</span>
            </div>
			</div>
		</div>
	);
};

export default PinComment;
