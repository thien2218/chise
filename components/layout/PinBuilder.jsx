import { useRouter } from "next/router";
import { useState } from "react";
import { useDb } from "../../hooks";
import ActionBtn from "../common/ActionBtn";
import ImgBuilder from "../create/ImgBuilder";
import ContentBuilder from "../create/ContentBuilder";

const PinBuilder = () => {
	const [imgFile, setImgFile] = useState(null);
	const [invalidUrlMsg, setInvalidUrlMsg] = useState("");
	const [values, setValues] = useState({
		imgRatio: 0,
		savedBy: [],
		cmtDisabled: false,
	});

	const { addPin } = useDb();
	const router = useRouter();

	const handleCreatePin = async (e) => {
		e.preventDefault();
		if (!imgFile || invalidUrlMsg) return;
		await addPin(imgFile, values);
		router.push("/");
	};

	return (
		<form>
			<div className="py-6 mx-auto w-full mlg:max-w-[56rem] max-w-[28rem]">
				<div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] grid mlg:grid-cols-[1fr_1.4fr] p-10">
					<ImgBuilder
						setImgFile={setImgFile}
						setValues={setValues}
						imgRatio={values.imgRatio}
					/>

					<ContentBuilder
						setValues={setValues}
						invalidUrlMsg={invalidUrlMsg}
						setInvalidUrlMsg={setInvalidUrlMsg}
					>
						<div className="flex gap-3">
							<button
								className="py-3 px-4 font-semibold rounded-full secondary-btn"
								onClick={handleCreatePin}
							>
								Upload
							</button>

							<ActionBtn classes="primary-btn">Save</ActionBtn>
						</div>
					</ContentBuilder>
				</div>
			</div>
		</form>
	);
};

export default PinBuilder;
