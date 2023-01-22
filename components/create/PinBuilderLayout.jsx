import { useRouter } from "next/router";
import { useState } from "react";
import { useDb, useAuth } from "../../hooks";
import Button from "../common/Button";
import ImgBuilder from "./ImgBuilder";
import ContentBuilder from "./ContentBuilder";

const PinBuilder = () => {
	const [invalidUrlMsg, setInvalidUrlMsg] = useState("");
	const [values, setValues] = useState({
		savedBy: [],
		cmtDisabled: false,
      tags: [],
	});
   
	const { createPin, uploadImg } = useDb();
   const { authUser: { id } } = useAuth();
	const router = useRouter();
   const containsUser = values.savedBy.includes(id);

	const handleCreatePin = async () => {
      if (!values.imgFile || invalidUrlMsg || !values.tags.length) return;
      
      const { downloadUrl, path } = await uploadImg(values.imgFile, "pin");
      values.pinImgUrl = downloadUrl;
      values.pinImgPath = path;

		await createPin(values);
		router.push("/");
	};

	const handleSave = () => {
		const updatedList = containsUser ? [] : [id];

		setValues({
			...values,
			savedBy: updatedList,
		});
	};

	return (
		<form className="md:py-6 px-4 py-2">
			<div className="mx-auto w-full mlg:max-w-[56rem] max-w-[28rem]">
				<div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] grid mlg:grid-cols-[1fr_1.4fr] md:p-10 p-6">
					<ImgBuilder
						setValues={setValues}
						values={values}
					/>

					<ContentBuilder
                  tags={values.tags}
						setValues={setValues}
						invalidUrlMsg={invalidUrlMsg}
						setInvalidUrlMsg={setInvalidUrlMsg}
					>
						<div className="flex gap-3">
							<Button btnType="secondary-btn" onClick={handleCreatePin}>
								Upload
							</Button>

							<Button
								btnType={containsUser ? "arbitrary-btn" : "primary-btn"}
                        onClick={handleSave}
                        noAsync
							>
								{containsUser ? "Saved" : "Save"}
							</Button>
						</div>
					</ContentBuilder>
				</div>
			</div>
		</form>
	);
};

export default PinBuilder;
