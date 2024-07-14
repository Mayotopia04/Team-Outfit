import styles from './Container.module.css';
import PropTypes from 'prop-types';

export const Container = ({ children }) => (
  <div className={styles.ContainerStyled}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
};
