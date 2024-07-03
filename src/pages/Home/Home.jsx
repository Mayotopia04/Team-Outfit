import React from 'react';
import CalcForm from 'components/CalcForm';
import { Container } from 'components/Container';
import ThemeSwitcher from 'components/ThemeSwitcher';
import styles from './Home.module.scss'; // Import SCSS module

const Home = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.MainGrid}>
        <CalcForm />
      </div>
      <div className={styles.ThemeSwitcherBox}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Home;

