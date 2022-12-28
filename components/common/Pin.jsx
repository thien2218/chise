import AdjustedImg from "./AdjustedImg";
import Link from "next/link";
import { HiPencil, HiFlag, HiDownload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import Avatar from "./Avatar";
import { useAuth } from "../../hooks";
import Avvvatars from "avvvatars-react";
import ActionBtn from "./ActionBtn";

const Pin = ({ pin }) => {
	const {
		authUser: { username },
	} = useAuth();
	const { id, author, link, savedBy, imgRatio, imgUrl } = pin;

	const shortenLink = (link) => {
		const protocolRegex = /(?:(https|http):\/\/)(?:www\.)?/;
		const uriRegex = /\/(.*)/;

		const noProtocol = link.replace(protocolRegex, "");
		const noProtoAndUri = noProtocol.replace(uriRegex, "");

		return noProtoAndUri;
	};

	return (
		<div className="w-full px-1.5 pb-4">
			<AdjustedImg ratio={imgRatio} src={imgUrl} scale={1}>
				<div className="relative w-full h-full opacity-0 hover:opacity-100 transition duration-100 flex flex-col justify-between">
					<Link href={`/pin/${id}`}>
						<a className="z-[8] absolute w-full h-full bg-black/30"></a>
					</Link>

					<div className="flex p-3 pb-0">
						{username == author.username && (
							<button className="h-8 w-8 flex-center bg-white/[.65] hover:bg-white/80 rounded-full z-[9] cursor-pointer transition m-1">
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
							<Link href={link}>
								<a className="relative h-full flex bg-white/70 hover:bg-white/[.85] rounded-full z-[9] cursor-pointer transition max-w-max px-3 items-center gap-1.5 min-w-0">
									<IoLink className="text-xl" />
									<div className="text-sm truncate">
										{shortenLink(link)}
									</div>
								</a>
							</Link>
						)}

						<div className="flex h-8 gap-2.5  ml-auto">
							<button className="aspect-square flex-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition">
								<HiDownload className="text-lg" />
							</button>

							<button className="aspect-square flex-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition">
								<HiFlag className="text-lg" />
							</button>
						</div>
					</div>
				</div>
			</AdjustedImg>

			<div className="py-2 px-1.5">
				<Link href={`/pin/${id}`}>
					<a>
						<h1 className="font-semibold mb-1 text-sm">{pin.title}</h1>
					</a>
				</Link>

				<Link href={`/${author.username}/created`}>
					<a className="flex items-center hover:last:underline">
						{author.profileUrl ? (
							<Avatar size={8} src={author.profileUrl} />
						) : (
							<Avvvatars size={8 * 4} value={author.name} />
						)}
						<div className="text-sm ml-1.5">{author.name}</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Pin;
