import { useLayout } from "../layout/Layout";

const Button = ({ children, onClick, btnType, noAsync }) => {
	const { isProcessing, setIsProcessing } = useLayout();

	return (
		<button
			onClick={(e) => {
				e.preventDefault();
            if (noAsync) {
               onClick();
            } else {
               setIsProcessing(true);
               onClick().then(() => {
                  setIsProcessing(false);
               });
            }
			}}
			className={`relative z-[9] py-3 px-4 font-semibold rounded-full btn-transition ${
				isProcessing ? "disabled-btn" : btnType
			}`}
		>
			{children}
		</button>
	);
};

export default Button;
