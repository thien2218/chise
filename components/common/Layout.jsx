import { useState, useEffect, useContext, createContext } from "react";
import EditForm from "./EditForm";
import ReportForm from "./ReportForm";
import ToastLoader from "../loader/ToastLoader";
import Header from "./Header";
import Head from "next/head";

const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

const Layout = ({ children, pageName }) => {
	const [report, setReport] = useState(null);
	const [edit, setEdit] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const title = `Chise${pageName ? " | " + pageName : ""}`;

	useEffect(() => {
		if (edit || report) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [edit, report]);

	const value = {
		isProcessing,
		setIsProcessing,
		setEdit,
		setReport,
	};

	return (
		<LayoutContext.Provider value={value}>
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

					{report ? (
						<ReportForm report={report} setReport={setReport} />
					) : edit ? (
						<EditForm edit={edit} setEdit={setEdit} />
					) : null}
				</>
			) : (
				children
			)}
		</LayoutContext.Provider>
	);
};

export default Layout;