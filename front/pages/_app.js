import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import wrapper from "../store/configureStore";
import WidthProvider from "../components/WidthProvider";

const Fourleaf = ({ Component }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Head>
        <title>iobox</title>

        <meta name="subject" content="iobox" />
        <meta name="title" content="iobox" />
        <meta name="author" content="iobox" />
        <meta name="keywords" content="iobox" />
        <meta name="description" content="iobox" />
        {/* <!-- OG tag  --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="iobox" />
        <meta property="og:site_name" content="iobox" />
        <meta property="og:url" content="https://www.sample.com/" />
        <meta property="og:description" content="iobox" />
        <meta property="og:keywords" content="iobox" />
        <meta property="og:image" content="/og_img.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.sample.com" />

        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>

        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>

        <script src="rotatingMenu.js"></script>

        <script type="text/javascript" src="./customScript.js"></script>
      </Head>
      <Component />
    </ThemeProvider>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);
