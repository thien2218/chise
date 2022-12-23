import ActionBtn from "./ActionBtn";
import AdjustedImg from "./AdjustedImg";

const EditField = ({ children, label, htmlFor }) => {
	return (
		<div className="py-3 px-4 grid md:grid-cols-[1fr_3fr] grid-cols-1 md:gap-4 gap-2">
			<label className="text-sm" htmlFor={htmlFor}>
				{label}
			</label>
			{children}
		</div>
	);
};

const EditForm = () => {
	return (
		<form className="fixed top-0 w-full h-full flex items-center z-20">
			<div className="px-4 mx-auto w-full max-w-[56rem]">
				<div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px]">
					<h1 className="text-[1.75rem] font-medium text-center p-6">
						Edit this pin
					</h1>

					<div className="px-4 grid grid-cols-[1fr_17.5rem]">
						<div>
							<EditField label="Title" htmlFor="title">
								<input
									type="text"
									name="title"
									id="title"
									className="border-b-[1.5px] outline-none pb-1 text-xl font-medium focus:border-blueish"
								/>
							</EditField>

							<EditField label="Description" htmlFor="description">
								<textarea
									name="description"
									id="description"
									cols="30"
									rows="10"
								></textarea>
							</EditField>

							<EditField label="Destination link" htmlFor="link">
								<input
									type="text"
									name="destination_link"
									id="link"
									className="border-b-[1.5px] outline-none pb-1 focus:border-blueish"
								/>
							</EditField>

							<EditField>
								<select>
									<option value="true">
										Disable comment
									</option>
									<option value="false">
										Enable comment
									</option>
								</select>
							</EditField>
						</div>

						<div className="py-3 px-4">
							<AdjustedImg
								ratio={150}
								src="/assets/cat.jpg"
							></AdjustedImg>
						</div>
					</div>

               <div className="flex justify-between p-6">
                  <ActionBtn classes="secondary-btn">Delete</ActionBtn>
                  <div className="flex gap-3">
                     <ActionBtn classes="secondary-btn">Cancel</ActionBtn>
                     <ActionBtn classes="primary-btn">Save</ActionBtn>
                  </div>
               </div>
				</div>
			</div>
		</form>
	);
};

export default EditForm;
