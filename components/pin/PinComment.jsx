import Avatar from "../common/Avatar";
import Link from "next/link";

const PinComment = () => {
	return (
		<div className="grid grid-cols-[auto_1fr] gap-2">
			<Link href="/">
            <a><Avatar size={8} src="/assets/cat1.jpg" /></a>
         </Link>

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
               <button className="font-semibold text-dark-gray">Like</button>
               <button className="font-semibold text-dark-gray">Report</button>
            </div>
			</div>
		</div>
	);
};

export default PinComment;
