import { HiLink, HiFlag, HiDownload, HiPencil } from "react-icons/hi";
import { useAuth } from "../../hooks";
import ActionBtn from "../common/ActionBtn";
import { useLayout } from "../layout/Layout";

const PinActions = ({ pinData }) => {
	const {
		authUser: { username },
	} = useAuth();
	const { setEdit, setReport } = useLayout();
	const { id, creator, link, savedBy, imgRatio, imgUrl, cmtDisabled } =
		pinData;
	const isCreator = (creator.username = username);

	return (
		<div className="flex justify-between">
			<div className="flex items-center">
				<button className="p-3 hover:bg-dimmed-500 rounded-full text-2xl">
					<HiDownload />
				</button>

				{link && (
					<a
						href={link}
						className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
						target="_blank"
					>
						<HiLink />
					</a>
				)}

				{isCreator ? (
					<button
						onClick={() =>
							setEdit({
								id,
								link,
								cmtDisabled,
								imgUrl,
								imgRatio,
								title: pinData.title,
								description: pinData.description,
							})
						}
						className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
					>
						<HiPencil />
					</button>
				) : (
					<button
						onClick={() => setReport(id)}
						className="p-3 hover:bg-dimmed-500 rounded-full text-2xl"
					>
						<HiFlag />
					</button>
				)}
			</div>

			<ActionBtn
				btnType="primary-btn"
				list={savedBy}
				altText="Saved"
				req={{ col: "pins", id }}
			>
				Save
			</ActionBtn>
		</div>
	);
};

export default PinActions;
