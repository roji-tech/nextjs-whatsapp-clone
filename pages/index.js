import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>NextJS WhatsApp Clone</title>
        <meta name="description" content="Whatsapp Clone with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <h1>WhatsApp Clone with NextJS</h1>
    </div>
  );
}
