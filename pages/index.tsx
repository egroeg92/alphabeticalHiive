import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import OrderString from "@/components/orderString";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Hiive Technical Interview</title>
        <meta name="description" content="Hiive Technical Interview" />
        <meta name="author" content="George Macrae" />
        <meta name="keywords" content="Hiive, Technical, Interview" />
        <meta name="date" content="2024-2-22" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={inter.className}>
        <div className={styles.container}>

          <div className={styles.headerContainer}>
              <h1 className={styles.title}>Junior Engineer at Hiive Technical Interview</h1>
              <h3 className={styles.subtitle}>George Macrae</h3>
              <h3 className={styles.subtitle}>2024-2-22</h3>
          </div>

          <OrderString />
          
        </div>

      </main>
    </>
  );
}
