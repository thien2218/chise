import ActionBtn from "../common/ActionBtn";
import { HiLink, HiFlag, HiDownload } from "react-icons/hi";

const PinActions = () => {
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

			<ActionBtn classes="primary-btn" >Save</ActionBtn>
		</div>
	);
};

export default PinActions;
