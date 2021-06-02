import Head from 'next/head';
//import styles from '../styles/Home.module.css';
import Home from '../components/main/Home';

export default function Index() {
  return (
    <div>
      <Head>
        <title>MTB Guides</title>
        <meta name="description" content="Ober Engardin Mountainbike Guides" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Home />
      </main>
    </div>
  );
}
