import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';

import s from './DailyCalorieIntake.module.scss';

import { items } from './items';
import Button from 'components/Shared/Button';

import daily from 'redux/daily-rate/daily-rate-selectors';

const DailyCalorieIntake = () => {
  const notAllowedProducts = useSelector(daily.notAllowedProducts);
  const dailyRate = Math.round(useSelector(daily.dailyRate));

  let itemsList = [];
  if (notAllowedProducts.length === 0) {
    itemsList = items;
  } else {
    for (let i = 0; i < 5; i += 1) {
      itemsList[i] = notAllowedProducts[i];
    }
  }

  function removeClassList() {
    document.querySelector('body').classList.remove('no-scroll');
  }

  return (
    <>
      <h2 className={s.modalTitle}>
        Your recommended daily calorie intake is:
      </h2>
      <p className={s.modalText}>
        {dailyRate}
        <span className={s.textDescription}>kcal</span>
      </p>
      <div className={s.menuGroup}>
        {itemsList.length > 0 && (
          <>
            <p className={s.menuGroupTitle}>
              Products that are not recommended for use:
            </p>
            <ul className={s.menuGroupList}>
              {itemsList.map(el => (
                <li key={nanoid()} className={s.menuGroupItems}>
                  {el}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <Link to="/registration">
        <Button
          text="Start losing weight"
          type="button"
          btnClass="btn"
          handleClick={removeClassList}
        />
      </Link>
    </>
  );
};

export default DailyCalorieIntake;

DailyCalorieIntake.defaultProps = {
  notAllowedProducts: () => {},
  dailyRate: () => {},
};

DailyCalorieIntake.propTypes = {
  notAllowedProducts: PropTypes.func,
  dailyRate: PropTypes.func,
};
