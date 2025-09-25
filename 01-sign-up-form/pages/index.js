import Head from 'next/head';
import SignUpForm from '../components/SignUpForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up Form</title>
        <meta name="description" content="Sign up form with real-time validation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <SignUpForm />
      </main>
    </div>
  );
}