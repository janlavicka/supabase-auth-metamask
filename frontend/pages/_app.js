import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider
      getLibrary={(provider) => new providers.Web3Provider(provider)}
    >
      <Head>
        <title>Supabase Auth + MetaMask</title>
        <meta name="description" content="Supabase Auth + MetaMask" />
      </Head>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
