import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import GlobalStyles from "@/theme/globalStyles";
import { WagmiConfig, configureChains, createClient, chain } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";
const ThemeConfig = dynamic(() => import("@/theme/index"), { ssr: false });

interface IApp extends AppProps {
  emotionCache?: EmotionCache;
}

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY })]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: "Staking Dapp" },
    }),
    new WalletConnectConnector({ chains, options: { qrcode: true } }),
    new InjectedConnector({
      chains,
      options: { name: "Injected", shimDisconnect: true },
    }),
  ],
  provider,
  webSocketProvider,
});

const clientSideEmotionCache = createEmotionCache();

export default function App(props: IApp) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <WagmiConfig client={client}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <ThemeConfig>
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeConfig>
        </CacheProvider>
      </WagmiConfig>
    </Provider>
  );
}
