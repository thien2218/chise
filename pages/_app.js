import "../styles/globals.css";
import { AuthProvider, ValidationProvider, DbProvider } from "../hooks";

function MyApp({ Component, pageProps }) {
	return (
		<ValidationProvider>
			<AuthProvider>
				<DbProvider>
					<Component {...pageProps} />
				</DbProvider>
			</AuthProvider>
		</ValidationProvider>
	);
}

export default MyApp;
