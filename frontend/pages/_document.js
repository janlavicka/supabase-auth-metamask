import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body className="min-h-screen font-sans text-base antialiased text-gray-900 bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
