import PinActions from "../pin/PinActions";
import PinUserInfo from "../pin/PinUserInfo";
import PinCommentSection from "../pin/PinCommentSection";
import AdjustedImg from "../common/AdjustedImg";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

const PinLayout = ({ pinData }) => {
	const { id, author, imgRatio, imgUrl, savedBy } = pinData;

	return (
		<article>
			<div className="py-6 mx-auto w-full mlg:max-w-[60rem] max-w-[30rem]">
				<div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] grid mlg:grid-cols-2">
					<div className="mlg:p-4">
						<AdjustedImg ratio={imgRatio} src={imgUrl} scale={2}>
							<div className="absolute h-full w-full group p-6 flex justify-end">
								<Link href={imgUrl}>
									<a className="px-3 py-2 font-semibold h-max opacity-0 group-hover:opacity-100 bg-white rounded-full flex items-center" target="_blank">
										<FiArrowUpRight className="text-3xl" />
										<span>View image</span>
									</a>
								</Link>
							</div>
						</AdjustedImg>
					</div>

					<div className="p-5 flex flex-col">
						<PinActions id={id} savedBy={savedBy} />
						<h1 className="heading mt-4 pr-4">{pinData.title}</h1>
						<p className="text-sm pr-3">{pinData.description}</p>
						<PinUserInfo {...author} />
						<PinCommentSection />
					</div>
				</div>
			</div>
		</article>
	);
};

export default PinLayout;
