const ActionBtn = ({ action, done, classes }) => {
	return (
		<button className={`py-3 px-4 font-semibold ${classes}`}>{action}</button>
	);
};

export default ActionBtn;
