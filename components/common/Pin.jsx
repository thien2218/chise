import AdjustedImg from "./AdjustedImg";
import Link from "next/link";
import { HiPencil, HiFlag, HiDownload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import { useAuth } from "../../hooks";
import ActionBtn from "./ActionBtn";
import { useLayout } from "../layout/Layout";
import { useRouter } from "next/router";
import ProfileImg from "./ProfileImg";

const Pin = ({ pin }) => {
	const { setEdit, setReport } = useLayout();
	const router = useRouter();

	const {
		authUser: { username },
	} = useAuth();
	const { id, creator, link, savedBy, imgRatio, imgUrl, cmtDisabled } = pin;
	const isCreator = creator.username == username;

	const shortenLink = (link) => {
		const protocolRegex = /(?:(https|http):\/\/)(?:www\.)?/;
		const uriRegex = /\/(.*)/;

		const noProtocol = link.replace(protocolRegex, "");
		const noProtoAndUri = noProtocol.replace(uriRegex, "");

		return noProtoAndUri;
	};

	return (
		<div className="w-full px-1.5 pb-4">
			<div className="overflow-hidden rounded-lg">
            <AdjustedImg ratio={imgRatio} src={imgUrl} scale={1}>
               <div className="relative w-full h-full opacity-100 md:opacity-0 md:hover:opacity-100 transition duration-100 flex flex-col justify-between">
                  <Link href={`/pin/${id}`}>
                     <a className="z-[8] absolute w-full h-full bg-black/30 hidden md:block" />
                  </Link>
            
                  <div className="flex p-3 pb-0">
                     {isCreator && (
                        <button
                           onClick={() =>
                              setEdit({
                                 id,
                                 link,
                                 cmtDisabled,
                                 imgUrl,
                                 imgRatio,
                                 title: pin.title,
                                 description: pin.description,
                              })
                           }
                           className="h-8 w-8 flex-center bg-white/[.65] hover:bg-white/80 rounded-full z-[9] cursor-pointer transition m-1"
                        >
                           <HiPencil className="text-lg" />
                        </button>
                     )}
            
                     <div className="flex justify-end flex-1">
                        <ActionBtn
                           btnType="primary-btn"
                           list={savedBy}
                           altText="Saved"
                           req={{ col: "pins", id }}
                        >
                           Save
                        </ActionBtn>
                     </div>
                  </div>
            
                  <div className="flex p-3 pt-4 gap-2.5">
                     {link && (
                        <a
                           href={link}
                           className="relative h-full flex bg-white/70 hover:bg-white/[.85] rounded-full z-[9] cursor-pointer transition max-w-max px-3 items-center gap-1.5 min-w-0"
                           target="_blank"
                        >
                           <IoLink className="text-xl" />
                           <div className="text-sm truncate">
                              {shortenLink(link)}
                           </div>
                        </a>
                     )}
            
                     <div className="flex h-8 gap-2.5  ml-auto">
                        <button className="aspect-square flex-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition">
                           <HiDownload className="text-lg" />
                        </button>
            
                        {!isCreator && (
                           <button
                              onClick={() => setReport({ id, col: "pins" })}
                              className="aspect-square flex-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition"
                           >
                              <HiFlag className="text-lg" />
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </AdjustedImg>
         </div>

			<div className="py-2 px-1.5">
				<Link href={`/pin/${id}`}>
					<a>
						<h1 className="font-semibold mb-1 text-sm">{pin.title}</h1>
					</a>
				</Link>

				<Link href={`/${creator.username}/created`}>
					<a className="flex items-center hover:last:underline">
						<ProfileImg
							profileUrl={creator.profileUrl}
							name={creator.name}
							size={8}
						/>
						<div className="text-sm ml-1.5">{creator.name}</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Pin;
