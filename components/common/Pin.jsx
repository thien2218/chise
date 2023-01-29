import { useEffect, useState } from "react";
import AdjustedImg from "./AdjustedImg";
import Link from "next/link";
import { HiPencil, HiFlag, HiDownload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import { useAuth, useLib } from "../../hooks";
import ActionBtn from "./ActionBtn";
import ProfileImg from "./ProfileImg";
import EditModal from "../modal/EditModal";
import ReportModal from "../modal/ReportModal";

const Pin = ({ pin }) => {
	const [currPin, setCurrPin] = useState(pin);

   useEffect(() => {
      setCurrPin(pin);
   }, [pin]);

	const { id, creator } = currPin;
	
   const { authUser } = useAuth();
   const { downloadImg } = useLib();
	const isCreator = creator.id === authUser.id;

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
				<AdjustedImg
					ratio={currPin.imgRatio}
					src={currPin.pinImgUrl}
					scale={1}
				>
					<div className="relative w-full h-full opacity-100 md:opacity-0 md:hover:opacity-100 transition duration-100 flex flex-col justify-between">
						<Link href={`/pin/${id}`}>
							<a className="z-[8] absolute w-full h-full bg-black/30 hidden md:block" />
						</Link>

						<div className="flex p-3 pb-0">
							{isCreator && (
								<EditModal {...currPin} setCurrPin={setCurrPin}>
									<button className="h-8 w-8 flex-center bg-white/[.65] hover:bg-white/80 rounded-full cursor-pointer transition m-1">
										<HiPencil className="text-lg" />
									</button>
								</EditModal>
							)}

							<div className="flex justify-end flex-1">
								<ActionBtn
									btnType="primary-btn"
									list={currPin.savedBy}
									altText="Saved"
									req={{ action: "save", id }}
								>
									Save
								</ActionBtn>
							</div>
						</div>

						<div className="flex p-3 pt-4 gap-2.5">
							{currPin.link && (
								<a
									href={currPin.link}
									className="relative h-full flex bg-white/70 hover:bg-white/[.85] rounded-full z-[9] cursor-pointer transition max-w-max px-3 items-center gap-1.5 min-w-0"
									target="_blank"
									rel="noreferrer noopener"
								>
									<IoLink className="text-xl" />
									<div className="text-sm truncate">
										{shortenLink(currPin.link)}
									</div>
								</a>
							)}

							<div className="flex h-8 gap-2.5  ml-auto">
								<button
									onClick={() => downloadImg(currPin.pinImgUrl)}
									className="aspect-square flex-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition"
								>
									<HiDownload className="text-lg" />
								</button>

								{!isCreator && (
									<ReportModal id={id} col="pins">
										<button className="h-full aspect-square flex-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition">
											<HiFlag className="text-lg" />
										</button>
									</ReportModal>
								)}
							</div>
						</div>
					</div>
				</AdjustedImg>
			</div>

			<div className="py-2 px-1.5">
				<Link href={`/pin/${id}`}>
					<a>
						<h1 className="font-semibold mb-1 text-sm">
							{currPin.title}
						</h1>
					</a>
				</Link>

				<Link href={`/${creator.id}/created`}>
					<a className="flex items-center group">
						<ProfileImg
							profileUrl={creator.profileUrl}
							username={creator.username}
							size={8}
						/>
						<div className="text-sm ml-1.5 group-hover:underline">
							{creator.name}
						</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Pin;
