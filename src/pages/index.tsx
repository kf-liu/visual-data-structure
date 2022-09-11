import { useState } from 'react';
import { history } from 'ice';
import { Button } from 'antd';
import About from '@/components/About';
import Logo from '@/components/Logo';
import styles from './index.module.css';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const onClickStart = () => {
    history?.push('/main/sort/bubble');
    setLoading(true);
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src="https://avatars.githubusercontent.com/u/41723241?v=4" alt="logo" className={styles.logo} />
        <Logo className={styles.title} />
      </header>
      <div className={styles.body}>
        <Button
          className={styles.start}
          type="primary"
          loading={loading}
          onClick={onClickStart}
        >
          START
        </Button>
        <About />
      </div>
    </div >
  );
}
