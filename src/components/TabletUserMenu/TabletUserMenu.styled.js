import { breakpoints } from 'helpers/breakpoints';
import styled from 'styled-components';

export const TabletUserMenuHeader = styled.div`
  min-width: 320px;
  display: none;

  @media ${breakpoints.minTablet} {
    display: block;
  }

  @media ${breakpoints.desktop} {
    margin-bottom: -10px;
  }
`;

export const TabletUserSideBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TabletUserMenuWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
`;

const baseTextStyles = `
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.04em;
`;

export const TabletUserName = styled.div`
  position: relative;
  color: #212121;
  ${baseTextStyles}

  ::after {
    content: '';
    position: absolute;
    top: -8px;
    right: -16px;
    height: 32px;
    width: 2px;
    background-color: #e0e0e0;
  }
`;

export const TabletUserMenuButton = styled.button`
  ${baseTextStyles}
  color: #9b9faa;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
