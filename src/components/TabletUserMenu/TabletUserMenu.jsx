import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUserName } from 'redux/auth/selectors.auth';
import styles from './TabletUserMenu.module.scss'; // Import SCSS module

const TabletUserMenu = ({ handleLogout }) => {
  const name = useSelector(selectUserName);

  return (
    <div className={styles.TabletUserMenuHeader}>
      <div className={styles.TabletUserSideBar}>
        <div className={styles.TabletUserMenuWrapper}>
          <div className={styles.TabletUserName}>{name}</div>
          <button type="button" className={styles.TabletUserMenuButton} onClick={handleLogout}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

TabletUserMenu.propTypes = {
  handleLogout: PropTypes.func,
};

export default TabletUserMenu;
