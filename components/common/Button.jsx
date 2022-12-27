const Button = ({ children, onClick, btnType }) => {
	return (
		<button
			onClick={onClick}
			className={`relative z-[9] py-3 px-4 font-semibold rounded-full ${btnType}`}
		>
			{children}
		</button>
	);
};

export default Button;
