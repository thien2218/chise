import { useState, Children, cloneElement, isValidElement } from "react";

const UploadImg = ({
	children,
	defaultSrc,
	setImgFile,
   setValues,
   imgRatio,
	selectedImg: SelectedImg,
}) => {
	const [imgSrc, setImgSrc] = useState(defaultSrc ?? null);

	const compressImg = (file, maxW, name) => {
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
				const W = width >= maxW ? maxW : width;
				const H = (height * W) / width;

				const newRatio = Math.floor((H / W) * 100);
				const createdAt = new Date().getTime();
				canvas.height = H;
				canvas.width = W;

				setValues((prev) => ({
					...prev,
					createdAt,
					imgRatio: newRatio,
				}));
				setImgSrc(newSrc);

				const ctx = canvas.getContext("2d");
				ctx.drawImage(imgEle, 0, 0, W, H);

				canvas.toBlob(
					(blob) => {
						const newFile = new File(
							[blob],
							`${name}-image${createdAt}.webp`,
							{ type: "image/webp" }
						);
						setImgFile(newFile);
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
		const file = e.target.files[0];
		compressImg(file, 200, "profile");
	};

   const unselectImg = (e) => {
      e.preventDefault();
      setImgFile(null);
      setImgSrc(null);
   }

	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { handlePreview });
		}
      return child;
	});

	if (imgSrc)
		return (
			<SelectedImg
				imgSrc={imgSrc}
				imgRatio={imgRatio}
            unselectImg={unselectImg}
            handlePreview={handlePreview}
			/>
		);

	return childrenWithProps;
};

export default UploadImg;
