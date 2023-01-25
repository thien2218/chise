import Link from "next/link";

const MoreLoader = ({ isLoadingMore, noMorePin }) => {
	return (
		<div
			className={`w-full flex-center flex-col gap-2 py-6 ${
				isLoadingMore || noMorePin ? "opacity-100" : "opacity-0"
			}`}
		>
			{!noMorePin ? (
				<>
					<div className="lds-ellipsis">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>

					<span className="text-xl text-center font-semibold text-dark-gray">
						Enjoy the feed?
						<br />
						Let&apos;s add some more
					</span>
				</>
			) : (
				<>
					<span className="text-dark-gray">
						Nothing more to show...yet! Create new ideas here
					</span>
					<Link href="/create">
						<a>
							<button className="primary-btn px-3 py-2.5 mt-1 text-sm rounded-full">
								Create Pin
							</button>
						</a>
					</Link>
				</>
			)}
		</div>
	);
};

export default MoreLoader;
