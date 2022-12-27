import Head from "next/head";

const Loader = () => {
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

         <div className="fixed top-0 left-0 right-0 bottom-0 flex-center bg-white">
            Loading...
         </div>
      </>
	);
};

export default Loader;
