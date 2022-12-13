const ActionBtn = ({ children, done, classes }) => {
	return (
		<button className={`py-3 px-4 font-semibold rounded-full ${classes}`}>{children}</button>
	);
};

export default ActionBtn;
