import PinActions from "../pin/PinActions";
import PinUserInfo from "../pin/PinUserInfo";
import PinCommentSection from "../pin/PinCommentSection";
import AdjustedImg from "../common/AdjustedImg";
import { ImArrowLeft2, ImArrowUpRight2 } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";
import MasonryLayout from "./MasonryLayout";

const PinLayout = ({ pinData, pins }) => {
	const { creator, imgRatio, imgUrl, cmtDisabled } = pinData;
	const { back } = useRouter();

	return (
		<>
         <article>
            <button
               className="h-12 aspect-square rounded-full flex-center bg-white hover:bg-dimmed-500 cursor-pointer fixed left-4 top-20 z-10"
               onClick={back}
            >
               <ImArrowLeft2 className="text-xl" />
            </button>
         
            <div className="py-6 mx-auto w-full mlg:max-w-[60rem] max-w-[30rem]">
               <div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] grid mlg:grid-cols-2">
                  <div className="mlg:p-4">
                     <AdjustedImg ratio={imgRatio} src={imgUrl} scale={2}>
                        <div className="absolute h-full w-full group p-6 flex justify-end">
                           <Link href={imgUrl}>
                              <a
                                 className="px-3 py-2 font-semibold h-max opacity-0 group-hover:opacity-100 bg-white rounded-full flex items-center"
                                 target="_blank"
                              >
                                 <ImArrowUpRight2 className="text-lg mr-1.5" />
                                 <span>View image</span>
                              </a>
                           </Link>
                        </div>
                     </AdjustedImg>
                  </div>
         
                  <div className="p-5 flex flex-col">
                     <PinActions pinData={pinData} />
                     <h1 className="heading mt-4 pr-4">{pinData.title}</h1>
                     <p className="text-sm pr-3">{pinData.description}</p>
                     <PinUserInfo {...creator} />
                     {/* {!cmtDisabled && <PinCommentSection />} */}
                  </div>
               </div>
            </div>
         </article>

         <span className="block text-center py-3 px-8 mb-1 text-xl font-medium">More like this</span>

         <MasonryLayout pins={pins} />
      </>
	);
};

export default PinLayout;
