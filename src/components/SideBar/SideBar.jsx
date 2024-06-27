import React from 'react';
import PropTypes from 'prop-types';


import {
  AsideBox,
  Div,
  KcalItem,
  KcalList,
  ProductList,
  Span,
  Text,
  Title,
} from './SideBar.styled';

const SideBar = ({ date, dailyInfo, notAllowedProducts }) => {
  const { dailyRate, kcalConsumed, kcalLeft, percentsOfDailyRate, daySummary } =
    dailyInfo || {};

  

  const getPercentsKcal = (percent) => {
    const total = dailyRate || daySummary?.dailyRate || 0;
    return Math.round((percent / 100) * total);
  };

  const normalLeft = Math.round(kcalLeft || daySummary?.kcalLeft || 0);
  const normalConsumed = Math.round(kcalConsumed || daySummary?.kcalConsumed || 0);
  const normalPercent = Math.round(percentsOfDailyRate || daySummary?.percentsOfDailyRate || 0);
  const normalPercentsKcal = getPercentsKcal(percentsOfDailyRate || daySummary?.percentsOfDailyRate || 0);

  return (
    <AsideBox>
      <Div>
        <Title>Summary for {date}</Title>
        <KcalList>
          <KcalItem>
            <Text>Left</Text>
            <Span>{normalLeft} kcal</Span>
          </KcalItem>
          <KcalItem>
            <Text>Consumed</Text>
            <Span>{normalConsumed} kcal</Span>
          </KcalItem>
          <KcalItem>
            <Text>Daily rate</Text>
            <Span>{dailyRate || daySummary?.dailyRate || '000'} kcal</Span>
          </KcalItem>
          <KcalItem>
            <Text>{normalPercent}% of normal</Text>
            <Span>{normalPercentsKcal} kcal</Span>
          </KcalItem>
        </KcalList>
      </Div>
      <Div>
        <Title>Food not recommended</Title>
        {/* No filter component */}
        <ProductList>
          {notAllowedProducts.length > 0 ? (
            notAllowedProducts.map((product, index) => (
              <KcalItem key={index}>
                <Text>{product}</Text>
              </KcalItem>
            ))
          ) : (
            <KcalItem>
              <Text>Your diet will be displayed here</Text>
            </KcalItem>
          )}
        </ProductList>
      </Div>
    </AsideBox>
  );
};

SideBar.propTypes = {
  date: PropTypes.string,
  dailyInfo: PropTypes.shape({
    dailyRate: PropTypes.number,
    kcalConsumed: PropTypes.number,
    kcalLeft: PropTypes.number,
    percentsOfDailyRate: PropTypes.number,
    daySummary: PropTypes.shape({
      dailyRate: PropTypes.number,
      kcalConsumed: PropTypes.number,
      kcalLeft: PropTypes.number,
      percentsOfDailyRate: PropTypes.number,
    }),
  }),
  notAllowedProducts: PropTypes.arrayOf(PropTypes.string),
};

export default SideBar;
