import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Templates/layout";
import { Inter } from "@next/font/google";
import ContextProvider from "../context/context";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <div className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ContextProvider>
  );
}
