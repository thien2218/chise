import { useState } from "react";
import ActionBtn from "../common/ActionBtn";
import ImgField from "./ImgField";
import TextFields from "./TextFields";

const PinBuilder = () => {
	const [imgFile, setImgFile] = useState(null);
	const [values, setValues] = useState({
		imgUrl: "",
      imgRatio: 0,
		savedBy: [],
		cmtDisabled: false,
	});

	return (
		<form>
			<div className="py-6 mx-auto w-full mlg:max-w-[56rem] max-w-[28rem]">
				<div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] grid mlg:grid-cols-[1fr_1.5fr] p-10">
					<ImgField
						setImgFile={setImgFile}
						setValues={setValues}
						imgRatio={values.imgRatio}
					/>

					<TextFields setValues={setValues}>
						<div className="flex gap-3">
							<ActionBtn
								action="Upload"
								classes="rounded-full secondary-btn"
							/>
							<ActionBtn
								action="Save"
								classes="rounded-full primary-btn"
							/>
						</div>
					</TextFields>
				</div>
			</div>
		</form>
	);
};

export default PinBuilder;
