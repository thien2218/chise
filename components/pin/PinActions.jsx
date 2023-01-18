import { HiLink, HiFlag, HiDownload, HiPencil } from "react-icons/hi";
import { useAuth } from "../../hooks";
import ActionBtn from "../common/ActionBtn";
import { useLayout } from "../layout/Layout";

const PinActions = ({ pinData }) => {
	const { authUser } = useAuth();
	const { setEdit, setReport } = useLayout();

   const { creator } = pinData;
	const isCreator = creator.username === authUser.username;

	return (
		<div className="flex justify-between">
			<div className="flex items-center">
				<button className="p-3 hover:bg-dimmed-500 rounded-full text-2xl">
					<HiDownload />
				</button>

				{pinData.link && (
					<a
						href={pinData.link}
						className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
						target="_blank"
						rel="noreferrer noopener"
					>
						<HiLink />
					</a>
				)}

				{isCreator ? (
					<button
						onClick={() => setEdit(pinData)}
						className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
					>
						<HiPencil />
					</button>
				) : (
					<button
						onClick={() => setReport({ id: pinData.id, col: "pins" })}
						className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
					>
						<HiFlag />
					</button>
				)}
			</div>

			<ActionBtn
				btnType="primary-btn"
				list={pinData.savedBy}
				altText="Saved"
				req={{ action: "save", id: pinData.id }}
			>
				Save
			</ActionBtn>
		</div>
	);
};

export default PinActions;
