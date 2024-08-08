import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import { QueryClient as ReactQueryClient,QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CssBaseline from '@mui/material/CssBaseline';
import { appWithTranslation } from 'next-i18next'
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from 'styles/theme';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'styles/mobileStyles.scss';
import 'styles/styles.scss';
import 'styles/global';
import "styles/desktop/embla.css";;

import createEmotionCache from '../extra/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new ReactQueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID as string;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={clientId}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ToastContainer />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />{' '}
          </ThemeProvider>
            </GoogleOAuthProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
