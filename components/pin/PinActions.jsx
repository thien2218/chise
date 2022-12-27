import { HiLink, HiFlag, HiDownload } from "react-icons/hi";
import ActionBtn from "../common/ActionBtn";

const PinActions = ({ savedBy }) => {
	return (
		<div className="flex justify-between">
			<div className="flex items-center">
				<button className="p-3 hover:bg-dimmed-500 rounded-full text-2xl">
					<HiDownload />
				</button>
				<button className="p-3 hover:bg-dimmed-500 rounded-full text-2xl">
					<HiLink />
				</button>
				<button className="p-3 hover:bg-dimmed-500 rounded-full text-2xl">
					<HiFlag />
				</button>
			</div>

			<ActionBtn
				btnType="primary-btn"
				list={savedBy}
				altText="Saved"
				req="save"
			>
				Save
			</ActionBtn>
		</div>
	);
};

export default PinActions;
