import { Children, cloneElement, isValidElement } from "react";

const UploadImg = ({
	children,
	imgUrl,
	setValues,
	imgRatio,
   customProps,
	selectedImg: SelectedImg,
}) => {
	const compressImg = (file, prop) => {
		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = function (e) {
			const imgEle = document.createElement("img");
			const newSrc = e.target.result;
			imgEle.src = newSrc;

			imgEle.onload = function (event) {
				const { width, height } = event.target;
				const canvas = document.createElement("canvas");
				const W = width > 500 ? 500 : width;
				const H = (height * W) / width;

				const newRatio = Math.floor((H / W) * 100);
				const uploadedAt = new Date().getTime();
				canvas.height = H;
				canvas.width = W;

				const ctx = canvas.getContext("2d");
				ctx.drawImage(imgEle, 0, 0, W, H);

				canvas.toBlob(
					(blob) => {
						const newFile = new File(
							[blob],
							`chise-image${uploadedAt}.webp`,
							{ type: "image/webp" }
						);
						setValues((prev) => ({
							...prev,
                     [prop]: newSrc,
							imgFile: newFile,
							imgRatio: newRatio,
						}));
					},
					"image/webp",
					0.85
				);
				canvas.remove();
			};
			imgEle.remove();
		};
	};

	const handlePreview = (e) => {
		const { id } = e.target;
		const file = e.target.files[0];
		compressImg(file, id);
	};

	const unselectImg = (e) => {
		e.preventDefault();
		const { id } = e.target;

		setValues((prev) => {
			const { imgFile, imgRatio, ...rest } = prev;
         rest[id] = "";
			return rest;
		});
	};

	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { handlePreview, unselectImg });
		}
		return child;
	});

	if (imgUrl)
		return (
			<SelectedImg
				imgUrl={imgUrl}
				imgRatio={imgRatio}
				unselectImg={unselectImg}
				handlePreview={handlePreview}
            {...customProps}
			/>
		);

	return childrenWithProps;
};

export default UploadImg;
