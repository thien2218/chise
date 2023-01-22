import { HiLink, HiFlag, HiDownload, HiPencil } from "react-icons/hi";
import { useAuth, useLib } from "../../hooks";
import ActionBtn from "../common/ActionBtn";
import EditModal from "../modal/EditModal";
import ReportModal from "../modal/ReportModal";

const PinActions = ({ currPin, setCurrPin }) => {
	const { authUser } = useAuth();
	const { id, creator } = currPin;
	const { downloadImg } = useLib();
	const isCreator = creator.id === authUser.id;

	return (
		<div className="flex justify-between">
			<div className="flex items-center">
				<button
					onClick={() => downloadImg(currPin.pinImgUrl)}
					className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
				>
					<HiDownload />
				</button>

				{currPin.link && (
					<a
						href={currPin.link}
						className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
						target="_blank"
						rel="noreferrer noopener"
					>
						<HiLink />
					</a>
				)}

				{isCreator ? (
					<EditModal {...currPin} setCurrPin={setCurrPin}>
						<button className="p-3 hover:bg-dimmed-500 rounded-full text-2xl">
							<HiPencil />
						</button>
					</EditModal>
				) : (
					<ReportModal id={id} col="pins">
						<button className="p-3 hover:bg-dimmed-500 rounded-full text-2xl">
							<HiFlag />
						</button>
					</ReportModal>
				)}
			</div>

			<ActionBtn
				btnType="primary-btn"
				list={currPin.savedBy}
				altText="Saved"
				req={{ action: "save", id: currPin.id }}
			>
				Save
			</ActionBtn>
		</div>
	);
};

export default PinActions;
