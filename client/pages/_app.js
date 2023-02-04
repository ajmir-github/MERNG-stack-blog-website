import "../styles/globals.css";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}
