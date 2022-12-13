import PinActions from "../pin/PinActions";
import PinUserInfo from "../pin/PinUserInfo";
import PinCommentSection from "../pin/PinCommentSection";
import AdjustedImg from "../common/AdjustedImg";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

const PinLayout = () => {
	return (
		<article>
			<div className="py-6 mx-auto w-full mlg:max-w-[60rem] max-w-[30rem]">
				<div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] grid mlg:grid-cols-2">
					<div className="mlg:p-4">
						<AdjustedImg ratio={150} src="/assets/cat.jpg">
                     <div className="absolute h-full w-full group p-6 flex justify-end">
                        <Link href="/">
                           <a className="px-3 py-2 font-semibold h-max opacity-0 group-hover:opacity-100 bg-white rounded-full flex items-center">
                              <FiArrowUpRight className="text-3xl" />
                              <span>View image</span>
                           </a>
                        </Link>
                     </div>
                  </AdjustedImg>
					</div>

					<div className="p-5 flex flex-col">
						<PinActions />
						<h1 className="heading mt-4 pr-4">
							Dark Seduction And Persuasion Tactics: The Simplified
							Playbook Of Charismatic Masters Of Deception. Leveraging
							Iq, Influence
						</h1>

						<p className="text-sm pr-3">
							Dark Seduction And Persuasion Tactics: The Simplified
							Playbook Of Charismatic Masters Of Deception. Leveraging
							Iq, Influence, And Irresistible Charm In The Art Of Covert
							Persuasion And Mind Games | Author: Emory Green |
							Publisher: Modern Mind Media | Publication Date: Oct 03,
							2020 | Number of Pages: 124 pages | Language: English |
							Binding: Paperback | ISBN-10: 1647801060 | ISBN-13:
							9781647801069
						</p>
						<PinUserInfo img="/assets/cat.jpg" username="Thien Huynh" />
						<PinCommentSection />
					</div>
				</div>
			</div>
		</article>
	);
};

export default PinLayout;
