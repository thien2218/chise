import Button from "../common/Button";
import Modal from "../headlessui/Modal";
import RadioInput from "../headlessui/RadioInput";

const ReportForm = ({ setIsOpen }) => {
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
		<div className="flex flex-col mt-4">
			<RadioInput options={options} srOnly="Report activity" />

			<div className="flex gap-3 mt-2 justify-end">
				<Button
					onClick={() => setIsOpen(false)}
					btnType="secondary-btn"
					noAsync
				>
					Cancel
				</Button>

				<Button
					noAsync
					btnType="primary-btn"
					onClick={() => setIsOpen(false)}
				>
					Report
				</Button>
			</div>
		</div>
	);
};

const ReportModal = ({ children, id, col }) => {
   return (
      <Modal
         title="Report activity"
         maxW="max-w-lg"
         customProps={{ id, col }}
         dialogChild={ReportForm}
      >
         {children}
      </Modal>
   )
}

export default ReportModal;
