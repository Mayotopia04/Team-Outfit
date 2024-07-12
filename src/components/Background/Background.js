import React from 'react';
import PropTypes from 'prop-types';
import styles from './Background.module.css';
import straw from '../../helpers/images/strawberry-desktop.png';
import banana from '../../helpers/images/banana-tablet.png';
import leaves from '../../helpers/images/leaves-aside-tablet.png';
import vector_d from '../../helpers/images/vector-desktop.png';
import vector from '../../helpers/images/vector-tablet.png';
import frame from '../../helpers/images/desktop.png';

export const Background = ({ children, isAuth }) => {
  const backgroundImageTablet = !isAuth
    ? `url(${banana}), url(${leaves}), url(${straw}), url(${vector})`
    : 'none';

  const backgroundImageDesktop = !isAuth
    ? `url(${frame}), url(${vector_d})`
    : 'none';

  return (
    <div
      className={`${styles.background} ${isAuth ? styles.auth : ''}`}
      style={{
        '--color': 'yourThemeColorHere',  // Replace 'yourThemeColorHere' with actual color value if needed
        '--backgroundImageTablet': backgroundImageTablet,
        '--backgroundImageDesktop': backgroundImageDesktop,
      }}
    >
      {children}
    </div>
  );
};

Background.propTypes = {
  isAuth: PropTypes.bool,
  children: PropTypes.node, // Corrected PropTypes for children
};

