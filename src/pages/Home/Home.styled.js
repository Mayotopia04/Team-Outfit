import { breakpoints } from 'helpers/breakpoints';
import styled from 'styled-components';

const MainGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ThemeSwitcherBox = styled.div`
  text-align: center;
  @media ${breakpoints.desktop} {
    display: none;
  }
`;

export { MainGrid, ThemeSwitcherBox };
