import { useRouter } from "next/router";
import { useState } from "react";
import { useDb } from "../../hooks";
import ActionBtn from "../common/ActionBtn";
import ImgField from "../create/ImgField";
import TextFields from "../create/TextFields";

const PinBuilder = () => {
	const [imgFile, setImgFile] = useState(null);
	const [values, setValues] = useState({
		imgRatio: 0,
		savedBy: [],
		cmtDisabled: false,
	});
	const { addPin } = useDb();
	const router = useRouter();

	const handleCreate = async (e) => {
		e.preventDefault();
		await addPin(imgFile, values);
		router.push("/");
	};

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
							<button
								className="py-3 px-4 font-semibold rounded-full secondary-btn"
								onClick={handleCreate}
							>
								Upload
							</button>

							<ActionBtn classes="primary-btn">
								Save
							</ActionBtn>
						</div>
					</TextFields>
				</div>
			</div>
		</form>
	);
};

export default PinBuilder;
