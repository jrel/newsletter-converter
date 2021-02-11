import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css?family=Roboto'
          rel='stylesheet'
        />
        <link
          href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'
          rel='stylesheet'
        />
      </Head>

      <Component {...pageProps} />

      <style global jsx>{`
        body {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </>
  );
}

export default MyApp;
