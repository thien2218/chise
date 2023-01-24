import AdjustedImg from "../common/AdjustedImg";
import { IoArrowUpCircle } from "react-icons/io5";

export const EditField = ({ children, label, htmlFor }) => {
	return (
		<div className="py-3 px-4 grid md:grid-cols-[1fr_3fr] grid-cols-1 md:gap-4 gap-2">
			<label className="text-sm h-min" htmlFor={htmlFor}>
				{label}
			</label>
			{children}
		</div>
	);
};

export const EditImgField = ({ imgRatio, imgUrl, handlePreview }) => {
	return (
		<div className="overflow-hidden rounded-lg">
			<AdjustedImg ratio={imgRatio} src={imgUrl} scale={1}>
				<div className="relative w-full h-full overflow-hidden bg-black/40 opacity-0 hover:opacity-100 p-4">
					<div className="rounded-lg h-full w-full border-dashed border-white border-[2px] flex-center flex-col text-center text-white gap-2 cursor-pointer">
						<IoArrowUpCircle className="text-3xl" />
						<span>Change image</span>
					</div>

					<input
						type="file"
                  id="pinImgUrl"
						className="absolute left-0 -top-full h-[200%] w-full cursor-pointer opacity-0"
						accept=".jpg,.png,.webp,.jpeg"
						onChange={handlePreview}
					/>
				</div>
			</AdjustedImg>
		</div>
	);
};