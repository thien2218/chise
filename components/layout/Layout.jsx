import { useState, useEffect, useContext, createContext } from "react";
import EditForm from "../common/EditForm";
import ReportForm from "../common/ReportForm";
import Header from "../common/Header";
import Head from "next/head";

const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

const Layout = ({ children, pageName }) => {
	const [report, setReport] = useState(null);
	const [edit, setEdit] = useState(null);
	const title = `Chise ${pageName ? " | " + pageName : pageName}`;

	useEffect(() => {
		if (edit || report) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [edit, report]);

	const value = {
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
				<title>{title}</title>
			</Head>

			{pageName != "Login" &&
			pageName != "Signup" &&
			pageName != "Add Profile" ? (
				<>
					<Header />
					<main className="pt-[4.5rem]">
						<LayoutContext.Provider value={value}>
							{children}
						</LayoutContext.Provider>
					</main>
               
					{report ? (
						<ReportForm report={report} setReport={setReport} />
					) : (
						edit && <EditForm edit={edit} setEdit={setEdit} />
					)}
				</>
			) : (
				children
			)}
		</>
	);
};

export default Layout;
