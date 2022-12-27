import Button from "../common/Button";

const ReportField = ({ id, label, description }) => {
	return (
		<div className="flex gap-2">
         <input
            type="radio"
            name="report"
            id={id}
            className="appearance-none h-6 aspect-square rounded-full shadow-[0_0_0_2px_inset] shadow-dark-gray checked:shadow-[0_0_0_8px_inset]"
         />

			<div>
				<label htmlFor={id} className="leading-[1]">{label}</label>
				<div className="text-xs text-dark-gray mt-1">{description}</div>
			</div>
		</div>
	);
};

const ReportForm = () => {
	const types = [
		{
			id: "spam",
			label: "Spam",
			description: "Misleading or repetitive posts",
		},
		{
			id: "dangerous_goods",
			label: "Dangerous goods",
			description: "Drugs, weapons, regulated products",
		},
		{
			id: "misinformation",
			label: "Misinformation",
			description: "Health, climate, political conspiracies",
		},
		{
			id: "hate",
			label: "Hateful activity",
			description: "Prejudice, stereotypes, white supremacy, slurs",
		},
		{
			id: "copyright",
			label: "Intellectual property violation",
			description: "Copyright or trademark infringement",
		},
		{
			id: "harassment",
			label: "Harassment or privacy violations",
			description: "Insults, threats, personally identifiable info",
		},
		{
			id: "r18",
			label: "Nudity or pornology",
			description: "Sexually explicit content",
		},
		{
			id: "violence",
			label: "Graphic violence",
			description: "Violent images or promotion of violence",
		},
	];

	return (
		<form className="fixed w-full h-full flex items-center top-0 z-20">
			<div className="px-4 mx-auto w-full max-w-lg">
				<div className="rounded-2xl bg-white shadow-[rgb(0_0_0_/_10%)_0px_1px_20px_0px] px-8 py-6">
					<h1 className="text-center text-3xl mb-6 font-medium">Report activity</h1>

               <div className="flex flex-col gap-3">
                  {types.map((type, id) => (
                     <ReportField {...type} key={id} />
                  ))}

                  <div className="flex gap-3 mt-2 justify-end">
                     <Button btnType="secondary-btn">Cancel</Button>
                     <Button btnType="primary-btn">Report</Button>
                  </div>
               </div>
				</div>
			</div>
		</form>
	);
};

export default ReportForm;
