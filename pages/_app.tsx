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
        colorScheme: 'dark',
        globalStyles: (theme) => ({
          body: {
            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[4],
            lineHeight: theme.lineHeight,
          }
        })
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  </>
  )
}
