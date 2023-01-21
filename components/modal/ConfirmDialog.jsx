import Button from "../common/Button";

const ConfirmDialog = ({
	description,
	handleConfirm,
	noAsync,
	setIsOpen,
	confirmTxt,
	cancelTxt,
}) => {
	return (
		<>
			<div className="mt-2">
				<p className="text-dark-gray">{description}</p>
			</div>

			<div className="mt-4 flex justify-end gap-3">
				{cancelTxt && (
					<Button
						btnType="secondary-btn"
						onClick={() => setIsOpen(false)}
						noAsync
					>
						{cancelTxt}
					</Button>
				)}

				<Button
					btnType="primary-btn"
					onClick={async () => {
						setIsOpen(false);
						await handleConfirm();
					}}
					noAsync={noAsync}
				>
					{confirmTxt}
				</Button>
			</div>
		</>
	);
};

export default ConfirmDialog;
