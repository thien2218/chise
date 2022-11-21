import "../styles/globals.css";
import {
	AuthProvider,
	ValidationProvider,
	DbProvider,
	AuthObserver,
} from "../hooks";

function MyApp({ Component, pageProps }) {
	return (
		<ValidationProvider>
			<AuthProvider>
				<AuthObserver>
               <DbProvider>
                  <Component {...pageProps} />
               </DbProvider>
            </AuthObserver>
			</AuthProvider>
		</ValidationProvider>
	);
}

export default MyApp;
