import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Carousel from "../components/Carousel";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Task</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Carousel itemWidth={200} gap={15}/>
      </main>

    </div>
  )
}

export default Home
