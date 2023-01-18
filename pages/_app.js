import "../styles/globals.css";
import { Layout } from "../components";
import { useRouter, Router } from "next/router";
import {
	AuthProvider,
	ValidationProvider,
	DbProvider,
	AuthObserver,
	usePreserveScroll,
	LibProvider,
} from "../hooks";
import nProgress from "nprogress";
nProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }) {
	const { pathname } = useRouter();
	const page = {
		"/auth/login": "Login",
		"/auth/signup": "Signup",
		"/auth/profile": "Add Profile",
		"/": "Home",
		"/create": "Create Pin",
		"/[userId]/settings/info": "Settings",
		"/[userId]/settings/account": "Settings",
	};
	const pageName = page[pathname] || "";
	usePreserveScroll();

   Router.events.on("routeChangeStart", (url) => {
      nProgress.start();
   })

   Router.events.on("routeChangeComplete", (url) => {
      nProgress.done();
   })

	return (
		<LibProvider>
			<ValidationProvider>
				<AuthProvider>
					<AuthObserver>
						<DbProvider>
							<Layout pageName={pageName}>
								<Component {...pageProps} />
							</Layout>
						</DbProvider>
					</AuthObserver>
				</AuthProvider>
			</ValidationProvider>
		</LibProvider>
	);
}

export default MyApp;
