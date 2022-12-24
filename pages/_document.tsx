import { Html, Head, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';

export default function Document() {
  const getInitialProps = createGetInitialProps();

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
