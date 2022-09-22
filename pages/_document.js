import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import {ColorModeScript} from "@chakra-ui/react";
import theme from '@/styles/theme.js'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head/>
        <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;