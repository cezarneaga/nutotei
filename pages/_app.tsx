import "../styles/index.css";
import type { AppProps /*, AppContext */ } from "next/app";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

import echarts from 'echarts'
import roCoordinates from '../components/counties-map/ro-coordinates.json'

echarts.registerMap('RO', roCoordinates);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
