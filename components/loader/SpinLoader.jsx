import Head from "next/head";

const SpinLoader = () => {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Chise | Loading</title>
			</Head>

			<div className="w-full pt-24 flex-center flex-col bg-white">
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<span className="text-dark-gray">Loading data</span>
			</div>
		</>
	);
};

export default SpinLoader;
