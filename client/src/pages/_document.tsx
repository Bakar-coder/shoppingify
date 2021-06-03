import Document, { Head, Main, NextScript, Html } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html dir="ltr" lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&amp;display=swap"
            rel="stylesheet"
          />
          <link href="/" rel="canonical" />
          <link href="/assets/css/ionic-icons.css" rel="stylesheet" />
          <link href="/cart.png" rel="icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
