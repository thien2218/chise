import "../styles/globals.css";
import {
	AuthProvider,
	ValidationProvider,
	DbProvider,
	UserProvider,
} from "../hooks";

function MyApp({ Component, pageProps }) {
	return (
		<ValidationProvider>
			<AuthProvider>
				<UserProvider>
               <DbProvider>
                  <Component {...pageProps} />
               </DbProvider>
            </UserProvider>
			</AuthProvider>
		</ValidationProvider>
	);
}

export default MyApp;
