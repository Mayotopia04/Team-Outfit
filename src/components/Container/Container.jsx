import styles from './Container.module.css';

const Container = ({ children }) => {
    return <div className={styles.ContainerStyled}>{children}</div>;
  };
  
export default Container;

