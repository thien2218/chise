import { IoArrowUpCircle, IoTrashBin } from "react-icons/io5";
import AdjustedImg from "../common/AdjustedImg";
import UploadImg from "../common/UploadImg";

const SelectedImg = ({ imgUrl, imgRatio, unselectImg }) => {
	return (
		<div>
			<div className="overflow-hidden rounded-lg">
				<AdjustedImg ratio={imgRatio} src={imgUrl} scale={1.5}>
					<button
                  id="pinImgUrl"
						className="absolute bg-white rounded-full h-12 w-12 p-1 hover:bg-dimmed-500 cursor-pointer right-4 top-4 border-4 border-white flex-center"
						onClick={unselectImg}
					>
						<IoTrashBin className="text-2xl pointer-events-none" />
					</button>
				</AdjustedImg>
			</div>
		</div>
	);
};

const UploadField = ({ handlePreview }) => {
	return (
		<div className="relative w-full aspect-[1/1.4] rounded-lg overflow-hidden bg-dimmed-400 p-4">
			<div className="rounded-lg h-full w-full border-dashed border-dimmed-600 border-[2px] flex-center flex-col text-center text-dark-gray gap-2 cursor-pointer">
				<IoArrowUpCircle className="text-3xl" />
				<span className="text-lg">
					Drag & drop
					<br />
					or click to upload
				</span>
			</div>

			<input
				type="file"
            id="pinImgUrl"
				className="absolute left-0 -top-full h-[200%] w-full cursor-pointer opacity-0"
				accept=".jpg,.png,.webp,.jpeg"
				onChange={handlePreview}
			/>
		</div>
	);
};

const ImgBuilder = ({ values, setValues }) => {
	return (
		<UploadImg
         imgUrl={values.pinImgUrl}
			setValues={setValues}
			imgRatio={values.imgRatio}
			selectedImg={SelectedImg}
		>
			<UploadField />
		</UploadImg>
	);
};

export default ImgBuilder;
