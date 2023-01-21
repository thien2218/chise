import { useState, useContext, createContext } from "react";
import ToastLoader from "../loader/ToastLoader";
import Header from "./Header";
import Head from "next/head";

const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

const Layout = ({ children, pageName }) => {
	const [isProcessing, setIsProcessing] = useState(false);
	const title = `Chise${pageName ? " | " + pageName : ""}`;

	return (
		<LayoutContext.Provider value={{ isProcessing, setIsProcessing }}>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>{title}</title>
			</Head>

			<ToastLoader isProcessing={isProcessing} />

			{pageName != "Login" &&
			pageName != "Signup" &&
			pageName != "Add Profile" ? (
				<>
					<Header />
					<main className="pt-[4.5rem]">{children}</main>
				</>
			) : (
				children
			)}
		</LayoutContext.Provider>
	);
};

export default Layout;
