import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {MantineProvider} from "@mantine/core";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>AC Management System</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>

    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark'
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  </>
  )
}
