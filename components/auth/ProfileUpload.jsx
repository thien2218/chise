import Avvvatars from "avvvatars-react";
import { BsCameraFill } from "react-icons/bs";
import Image from "next/image";
import { IoTrashBin } from "react-icons/io5";

export const ProfileSelected = ({ imgUrl, unselectImg }) => {
	return (
		<div className="absolute top-0 left-0 w-full -translate-y-[40%] flex justify-center">
			<div className="relative h-32 aspect-square rounded-full overflow-hidden border-[6px] border-white cursor-pointer flex-center group">
				<Image
					src={imgUrl}
					layout="fill"
					objectFit="cover"
					alt="Selected profile image"
				/>

				<button
					id="profileUrl"
					className="absolute w-full h-full opacity-0 flex-center flex-col text-center group-hover:opacity-100 bg-black/40 text-white"
					onClick={unselectImg}
				>
					<IoTrashBin className="text-2xl pointer-events-none" />
					<span className="text-sm pointer-events-none mt-1">Remove</span>
				</button>
			</div>
		</div>
	);
};

export const ProfileDefault = ({ username, handlePreview }) => {
	return (
		<div className="absolute top-0 left-0 w-full -translate-y-[40%] flex justify-center">
			<div className="relative h-32 aspect-square rounded-full overflow-hidden border-[6px] border-white cursor-pointer flex-center group">
				<Avvvatars size={32 * 4} value={username} />

				<div className="absolute w-full h-full opacity-0 flex-center flex-col text-center group-hover:opacity-100 bg-black/40 text-white">
					<BsCameraFill className="text-2xl" />
					<span className="text-sm">Upload image</span>
				</div>

				<input
					type="file"
					id="profileUrl"
					className="absolute opacity-0 -top-full h-[200%] w-full cursor-pointer"
					accept=".jpg,.png,.webp,.jpeg"
					onChange={handlePreview}
				/>
			</div>
		</div>
	);
};
