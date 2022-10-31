import type { AppProps } from "next/app";
import Head from "next/head";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import GlobalStyles from "@/theme/globalStyles";
import ThemeConfig from "../theme/";

interface IApp extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App(props: IApp) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeConfig>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeConfig>
      </CacheProvider>
    </Provider>
  );
}
