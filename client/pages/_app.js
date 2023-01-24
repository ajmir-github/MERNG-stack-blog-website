import "../styles/globals.css";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";
import { ApolloClientProvider } from "../ApolloClientProvider";

export default function App({ Component, pageProps }) {
  return (
    <ApolloClientProvider>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </ApolloClientProvider>
  );
}
