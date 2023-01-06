import "../styles/globals.css";
import { Layout } from "../components";
import { useRouter } from "next/router";
import {
	AuthProvider,
	ValidationProvider,
	DbProvider,
	AuthObserver,
   usePreserveScroll
} from "../hooks";

function MyApp({ Component, pageProps }) {
   const { pathname } = useRouter();
   const page = {
      "/auth/login": "Login",
      "/auth/signup": "Signup",
      "/auth/profile": "Add Profile",
      "/": "Home",
      "/create": "Create Pin",
      "/setttings": "Setttings",
   }
   const pageName = page[pathname] || "";
   usePreserveScroll();

	return (
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
	);
}

export default MyApp;
