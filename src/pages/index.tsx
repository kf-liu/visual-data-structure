import { Link } from 'ice';
import About from '@/components/About';
import logo from '@/assets/logo.png';
import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.logo} />
        <p className={styles.title}>
          数据结构可视化
          <br />
          Data Structure Visualization
        </p>
      </header>
      <div className={styles.body}>
        <Link to="/main/sort/bubble" className={styles.button}>
          START
        </Link>
        <About />
      </div>
    </div >
  );
}
