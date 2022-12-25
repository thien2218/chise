import { useState } from "react";
import { IoArrowUpCircle, IoTrashBin } from "react-icons/io5";
import { useDb } from "../../hooks";
import AdjustedImg from "../common/AdjustedImg";

const SelectedImg = ({ imgSrc, imgRatio, setImgSrc, setImgFile }) => {
	return (
		<AdjustedImg ratio={imgRatio} src={imgSrc}>
			<button
				className="absolute bg-white rounded-full h-12 w-12 p-1 hover:bg-dimmed-500 cursor-pointer right-4 top-4 border-4 border-white flex items-center justify-center"
				onClick={(e) => {
					e.preventDefault();
					setImgSrc(null);
					setImgFile(null);
				}}
			>
				<IoTrashBin className="text-2xl" />
			</button>
		</AdjustedImg>
	);
};

const UploadField = ({ setImgSrc, setImgFile, setValues }) => {
   const { compressImg } = useDb();

	const handlePreview = (e) => {
      const file = e.target.files[0];
      compressImg(file, 500, "pin", setImgSrc, setImgFile, setValues);
	};

	return (
		<div className="relative w-full aspect-[1/1.4] rounded-lg overflow-hidden bg-dimmed-400 p-4">
         <div className="rounded-lg h-full w-full border-dashed border-dimmed-600 border-[2px] flex flex-col justify-center items-center text-center text-dark-gray gap-2 cursor-pointer">
            <IoArrowUpCircle className="text-3xl" />
            <span className="text-lg">
               Drag & drop
               <br />
               or click to upload
            </span>
         </div>
      
         <input
            type="file"
            name="pinImg"
            id="pinImg"
            className="absolute -top-1/2 h-[150%] w-full cursor-pointer opacity-0"
            accept=".jpg,.png,.webp,.jpeg"
            onChange={handlePreview}
         />
      </div>
	);
};

const ImgBuilder = ({ setImgFile, setValues, imgRatio }) => {
	const [imgSrc, setImgSrc] = useState(null);

	if (imgSrc)
		return (
			<SelectedImg
				imgSrc={imgSrc}
				imgRatio={imgRatio}
				setImgFile={setImgFile}
				setImgSrc={setImgSrc}
			/>
		);

	return (
		<UploadField
			setImgSrc={setImgSrc}
			setImgFile={setImgFile}
			setValues={setValues}
		/>
	);
};

export default ImgBuilder;
