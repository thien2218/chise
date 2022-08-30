import React from "react";
import { ShareIcon, FlagIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid';

const PinActions = () => {
	return (
		<div className="flex justify-between">
			<div className="flex items-center">
				<ShareIcon className="h-12 w-12 p-3 rounded-full hover:bg-dimmed-500 cursor-pointer" />
				<FlagIcon className="h-12 w-12 p-3 rounded-full hover:bg-dimmed-500 cursor-pointer" />
				<ArchiveBoxArrowDownIcon className="h-12 w-12 p-3 rounded-full hover:bg-dimmed-500 cursor-pointer" />
			</div>

			<button className="primary-btn rounded-2xl py-3 px-4 font-semibold">
				Save
			</button>
		</div>
	);
};

export default PinActions;
