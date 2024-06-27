import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUserName } from 'redux/auth/selectors.auth';
import {
  TabletUserMenuButton,
  TabletUserMenuHeader,
  TabletUserMenuWrapper,
  TabletUserName,
  TabletUserSideBar,
} from './TabletUserMenu.styled';

const TabletUserMenu = ({ handleLogout }) => {
  const name = useSelector(selectUserName);

  return (
    <TabletUserMenuHeader>
      <TabletUserSideBar>
        <TabletUserMenuWrapper>
          <TabletUserName>{name}</TabletUserName>
          <TabletUserMenuButton onClick={handleLogout}>
            Exit
          </TabletUserMenuButton>
        </TabletUserMenuWrapper>
      </TabletUserSideBar>
    </TabletUserMenuHeader>
  );
};

TabletUserMenu.propTypes = {
  handleLogout: PropTypes.func,
};

export default TabletUserMenu;
