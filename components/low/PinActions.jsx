import React from "react";
import { ShareIcon, FlagIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/20/solid';

const PinActions = () => {
	return (
		<div className="flex justify-between">
			<div className="flex items-center">
				<ShareIcon className="icon-btn" />
				<FlagIcon className="icon-btn" />
				<ArchiveBoxArrowDownIcon className="icon-btn" />
			</div>

			<button className="primary-btn rounded-2xl py-3 px-4 font-semibold">
				Save
			</button>
		</div>
	);
};

export default PinActions;
