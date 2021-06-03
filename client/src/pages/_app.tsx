import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Online shop" />
        <meta name="keywords" content="" />
        <meta name="author" content="Wabomba Bakar" />
        <base />
        <title>Shoppingify – Digital Shop</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
