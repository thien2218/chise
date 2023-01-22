import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

const ProfileCopy = ({ imgUrl, handlePreview, unselectImg }) => {
	return (
		<div className="absolute top-0 left-0 w-full -translate-y-[40%] flex justify-center">
			<div className="relative h-32 aspect-square rounded-full overflow-hidden border-[6px] border-white cursor-pointer flex-center group">
				<Image src={imgUrl} layout="fill" objectFit="cover" />

				<div className="absolute w-full h-full opacity-0 flex-center flex-col text-center group-hover:opacity-100 bg-black/40 text-white">
					<BsCameraFill className="text-2xl" />
					<span className="text-sm">Upload profile</span>
				</div>

				<input
					type="file"
					name="profileUrl"
					className="absolute opacity-0 -top-full h-[200%] w-full cursor-pointer"
					accept=".jpg,.png,.webp,.jpeg"
					onChange={handlePreview}
				/>
			</div>

			<button
				onClick={unselectImg}
				className="absolute p-2 bg-dimmed-500 flex-center rounded-full -top-1 -right-1"
			>
				<IoTrashBin className="text-sm pointer-events-none" />
			</button>
		</div>
	);
};

export default ProfileCopy;
