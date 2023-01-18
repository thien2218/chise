import AdjustedImg from "./AdjustedImg";
import Link from "next/link";
import { HiPencil, HiFlag, HiDownload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import { useAuth } from "../../hooks";
import ActionBtn from "./ActionBtn";
import { useLayout } from "../layout/Layout";
import ProfileImg from "./ProfileImg";

const Pin = ({ pin }) => {
	const { setEdit, setReport } = useLayout();
	const { id, creator } = pin;
	const { authUser } = useAuth();
	const isCreator = creator.username == authUser.username;

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
				<AdjustedImg ratio={pin.imgRatio} src={pin.imgUrl} scale={1}>
					<div className="relative w-full h-full opacity-100 md:opacity-0 md:hover:opacity-100 transition duration-100 flex flex-col justify-between">
						<Link href={`/pin/${id}`}>
							<a className="z-[8] absolute w-full h-full bg-black/30 hidden md:block" />
						</Link>

						<div className="flex p-3 pb-0">
							{isCreator && (
								<button
									onClick={() => setEdit(pin)}
									className="h-8 w-8 flex-center bg-white/[.65] hover:bg-white/80 rounded-full z-[9] cursor-pointer transition m-1"
								>
									<HiPencil className="text-lg" />
								</button>
							)}

							<div className="flex justify-end flex-1">
								<ActionBtn
									btnType="primary-btn"
									list={pin.savedBy}
									altText="Saved"
									req={{ action: "save", id }}
								>
									Save
								</ActionBtn>
							</div>
						</div>

						<div className="flex p-3 pt-4 gap-2.5">
							{pin.link && (
								<a
									href={pin.link}
									className="relative h-full flex bg-white/70 hover:bg-white/[.85] rounded-full z-[9] cursor-pointer transition max-w-max px-3 items-center gap-1.5 min-w-0"
									target="_blank"
									rel="noreferrer noopener"
								>
									<IoLink className="text-xl" />
									<div className="text-sm truncate">
										{shortenLink(pin.link)}
									</div>
								</a>
							)}

							<div className="flex h-8 gap-2.5  ml-auto">
								<button className="aspect-square flex-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition">
									<HiDownload className="text-lg" />
								</button>

								{!isCreator && (
									<button
										onClick={() =>
											setReport({ id, col: "pins" })
										}
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
							username={creator.username}
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
