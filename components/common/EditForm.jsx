import ActionBtn from "./ActionBtn";
import AdjustedImg from "./AdjustedImg";
import { IoIosArrowDown } from "react-icons/io";

const EditField = ({ children, label, htmlFor }) => {
	return (
		<div className="py-3 px-4 grid md:grid-cols-[1fr_3fr] grid-cols-1 md:gap-4 gap-2">
			<label className="text-sm h-min" htmlFor={htmlFor}>
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

					<div className="px-4 grid xs:grid-cols-[1fr_17.5rem] grid-cols-1">
						<div className="row-start-2 xs:row-start-1">
							<EditField label="Title" htmlFor="title">
								<input
									type="text"
									name="title"
									id="title"
									className="border-b-[1.5px] outline-none pb-1 text-xl font-medium focus:border-blueish"
								/>
							</EditField>

							<EditField label="Destination link" htmlFor="link">
								<input
									type="text"
									name="destination_link"
									id="link"
									className="border-b-[1.5px] outline-none pb-1 focus:border-blueish"
								/>
							</EditField>

							<EditField label="Description" htmlFor="description">
								<textarea
									name="description"
									id="description"
									className="h-80 resize-none outline-none border-[1.5px] rounded-lg py-1 px-2 focus:border-blueish"
								></textarea>
							</EditField>

							<EditField label="Comment" htmlFor="comment">
								<div className="w-full relative">
									<select
										id="comment"
										className="p-3 bg-dimmed-400 hover:bg-dimmed-500 rounded-lg cursor-pointer outline-none font-medium w-full peer"
									>
										<option value="true">Disabled</option>
										<option value="false">Enabled</option>
									</select>

									<div className="absolute right-0 bottom-0 h-full aspect-square flex justify-center items-center rounded-lg bg-dimmed-400 peer-hover:bg-dimmed-500 pointer-events-none">
										<IoIosArrowDown className="text-xl" />
									</div>
								</div>
							</EditField>
						</div>

						<div className="py-3 px-4 row-start-1">
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
