import { useState } from "react";
import { IoArrowUpCircle, IoTrashBin } from "react-icons/io5";
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

const UploadField = ({ setImgSrc, setImgFile, setImgRatio }) => {
	const handlePreview = (e) => {
		if (!e.target.files[0]) return;

		console.log(e.target.files[0]);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);

		reader.onload = function (event) {
			const imgEle = document.createElement("img");
			const imgSrc = event.target.result;
			imgEle.src = imgSrc;

			setImgSrc(imgSrc);

			imgEle.onload = function (ev) {
				const canvas = document.createElement("canvas");
				const W = 600;
				const H = (ev.target.height * W) / ev.target.width;

				const imgRatio = Math.floor((H / W) * 100);
				canvas.height = H;
				canvas.width = W;

				setImgRatio(imgRatio);

				const ctx = canvas.getContext("2d");
				ctx.drawImage(imgEle, 0, 0, W, H);

				canvas.toBlob(
					(blob) => {
						const imgFile = new File(
							[blob],
							`pin-image${(new Date() / 1000) | 0}.webp`
						);
						setImgFile(imgFile);
					},
					"image/webp",
					0.75
				);

				canvas.remove();
			};
			imgEle.remove();
		};
	};

	return (
		<div className="relative w-full aspect-[1/1.4] rounded-lg overflow-hidden bg-dimmed-400 p-4">
			<div className="rounded-lg h-full w-full border-dashed border-dimmed-600 border-[2px] flex flex-col justify-center items-center text-center font-semibold text-dark-gray">
				<IoArrowUpCircle className="text-3xl" />
				<span className="text-lg">
					Drag & drop
					<br />
					or click to upload
				</span>
			</div>

			<input
				type="file"
				name="imgUpload"
				className="cursor-pointer appearance-none absolute top-0 left-0 right-0 bottom-0 opacity-0"
				accept=".jpg,.png,.webp,.jpeg"
				onChange={handlePreview}
			/>
		</div>
	);
};

const ImgField = ({ setImgFile, setImgRatio, imgRatio }) => {
	const [imgSrc, setImgSrc] = useState(null);

	if (imgSrc)
		return (
			<div className="flex">
				<SelectedImg
					imgSrc={imgSrc}
					imgRatio={imgRatio}
					setImgFile={setImgFile}
					setImgSrc={setImgSrc}
				/>
			</div>
		);

	return (
		<UploadField
			setImgSrc={setImgSrc}
			setImgFile={setImgFile}
			setImgRatio={setImgRatio}
		/>
	);
};

export default ImgField;
