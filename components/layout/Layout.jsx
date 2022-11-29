import Sidebar from "../high/Sidebar";
import Header from "../common/Header";
import Head from "next/head";

const Layout = ({ children, pageName }) => {
   const title = `Chise ${pageName ? " | " + pageName : pageName}`;

	return (
		<>
			<Head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>{title}</title>
			</Head>

			{pageName != "Login" && pageName != "Signup" ? (
				<>
					<Header />
					{pageName == "Home" ? (
						<>
							<Sidebar />
							<main className="pt-16 pl-[17.5rem]">{children}</main>
						</>
					) : (
						<main className="pt-16">{children}</main>
					)}
				</>
			) : (
				children
			)}
		</>
	);
};

export default Layout;
