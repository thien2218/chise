import "../styles/globals.css";
import { Layout } from "../components";
import { useRouter } from "next/router";
import {
	AuthProvider,
	ValidationProvider,
	DbProvider,
	UserProvider,
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

	return (
		<ValidationProvider>
			<AuthProvider>
				<UserProvider>
               <DbProvider>
                  <Layout pageName={pageName}>
                     <Component {...pageProps} />
                  </Layout>
               </DbProvider>
            </UserProvider>
			</AuthProvider>
		</ValidationProvider>
	);
}

export default MyApp;
