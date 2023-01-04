import Button from "../common/Button";
import RadioInput from "../headlessui/RadioInput";

const ReportForm = ({ setReport }) => {
	const options = [
		{
			label: "Spam",
			description: "Misleading or repetitive posts",
		},
		{
			label: "Dangerous goods",
			description: "Drugs, weapons, regulated products",
		},
		{
			label: "Misinformation",
			description: "Health, climate, political conspiracies",
		},
		{
			label: "Hateful activity",
			description: "Prejudice, stereotypes, white supremacy, slurs",
		},
		{
			label: "Intellectual property violation",
			description: "Copyright or trademark infringement",
		},
		{
			label: "Harassment or privacy violations",
			description: "Insults, threats, personally identifiable info",
		},
		{
			label: "Nudity or pornology",
			description: "Sexually explicit content",
		},
		{
			label: "Graphic violence",
			description: "Violent images or promotion of violence",
		},
	];

	return (
		<form className="fixed overflow-y-scroll w-full h-full flex items-center top-0 z-20">
         <div onClick={() => setReport(null)} className="absolute z-30 h-full w-full"></div>

			<div className="px-4 mx-auto w-full max-w-lg">
				<div className="relative z-40 rounded-2xl bg-white shadow-[rgb(0_0_0_/_50%)_0_0_0_9000px] px-8 py-6">
					<h1 className="text-center text-3xl mb-6 font-medium">
						Report activity
					</h1>

					<div className="flex flex-col gap-3">
						<RadioInput options={options} srOnly="Report activity" />

						<div className="flex gap-3 mt-2 justify-end">
							<Button
								onClick={() => setReport(null)}
								btnType="secondary-btn"
							>
								Cancel
							</Button>
							<Button btnType="primary-btn">Report</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default ReportForm;
