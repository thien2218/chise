import Link from "next/link";

const LinkBtn = ({ children, href, isCurrPage }) => {
	return (
		<Link href={href}>
			<a
				className={`relative p-2 font-semibold rounded-lg hover:bg-dimmed-500 ${
					isCurrPage &&
					"pointer-events-none before:w-[calc(100%_-_16px)] before:h-[3px] before:bg-gray-900 before:rounded-full before:absolute before:-bottom-[3px]"
				}`}
			>
				{children}
			</a>
		</Link>
	);
};

export default LinkBtn;
