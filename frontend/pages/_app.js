import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider
      getLibrary={(provider) => new providers.Web3Provider(provider)}
    >
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
