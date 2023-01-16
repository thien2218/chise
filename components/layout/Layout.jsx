import { useState, useEffect, useContext, createContext } from "react";
import EditForm from "../common/EditForm";
import ReportForm from "../common/ReportForm";
import ToastLoader from "../loader/ToastLoader";
import Header from "../common/Header";
import Head from "next/head";

const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

const Layout = ({ children, pageName }) => {
	const [report, setReport] = useState(null);
	const [edit, setEdit] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const title = `Chise${pageName ? " | " + pageName : ""}`;

	useEffect(() => {
		if (edit || report) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [edit, report]);

	const value = {
		isLoadingMore,
		isProcessing,
		setIsLoadingMore,
		setIsProcessing,
		setEdit,
		setReport,
	};

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
					integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
					crossorigin="anonymous"
					referrerpolicy="no-referrer"
				/>
				<title>{title}</title>
			</Head>

			<ToastLoader isProcessing={isProcessing} />

			{pageName != "Login" &&
			pageName != "Signup" &&
			pageName != "Add Profile" ? (
				<LayoutContext.Provider value={value}>
					<Header />

					<main className="pt-[4.5rem]">{children}</main>

					{report ? (
						<ReportForm report={report} setReport={setReport} />
					) : edit ? (
						<EditForm edit={edit} setEdit={setEdit} />
					) : null}
				</LayoutContext.Provider>
			) : (
				children
			)}
		</>
	);
};

export default Layout;
