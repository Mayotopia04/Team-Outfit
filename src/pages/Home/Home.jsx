import React from 'react';
import CalcForm from 'components/CalcForm';
import { Container } from 'components/Container';
import ThemeSwitcher from 'components/ThemeSwitcher';
import { MainGrid, ThemeSwitcherBox } from './Home.styled';

const Home = () => {
  return (
    <Container>
      <MainGrid>
        <CalcForm />
      </MainGrid>
      <ThemeSwitcherBox>
        <ThemeSwitcher />
      </ThemeSwitcherBox>
    </Container>
  );
};

export default Home;
