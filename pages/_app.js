import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
   const router = useRouter();

	return (
      <Layout home={router.pathname == '/'}>
         <Component {...pageProps} />
      </Layout>
   );
}

export default MyApp;
