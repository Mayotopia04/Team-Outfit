import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';

import s from './DailyCalorieIntake.module.scss';

import Button from 'components/Shared/Button';
import products from '../../products.json';


const data = JSON.parse(localStorage.getItem("unregisteredUser"));
const gender = "F";

// FORMULA FOR CALCULATING DAILY CALORIE NORMS FOR WOMEN 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desired weight)
// FORMULA FOR CALCULATING DAILY CALORIE NORMS FOR MEN 10 * weight + 6.25 * height - 5 * age - 5 - 10 * (weight - desired weight)
  const partialCalories = 10 * data.weight + 6.25 * data.height - 5 * data.age - 10 * (data.weight - data.desiredWeight);
  const calories = gender === "F" ? partialCalories - 161 : partialCalories - 5; 
  const notAllowedProducts = products
  .filter(product => product.groupBloodNotAllowed[data.bloodType] === true)
  .map(product => product.title);


const DailyCalorieIntake = () => {
  // const notAllowedProducts = useSelector(daily.notAllowedProducts);
  // const dailyRate = Math.round(useSelector(daily.dailyRate));

  function removeClassList() {
    document.querySelector('body').classList.remove('no-scroll');
  }

  return (
    <>
      <div className={s.modalContent}>
        <h2 className={s.modalTitle}>Your recommended daily calorie intake is</h2>
        <p className={s.modalCalories}>{calories} kcal</p>
        <div className={s.modalFoodContainer}>
          <hr className={s.divider}/>
          <p className={s.modalFood}>Foods you should not eat</p>
          <ol className={s.modalFoodList}>
            {notAllowedProducts.map(product => <li key={nanoid()} className={s.modalFoodListItem}>{product}</li>)}
          </ol>
        </div>
        <Link to="/registration">
          <Button
            text="Start losing weight"
            type="button"
            btnClass="btn"
            handleClick={removeClassList}
          />
        </Link>
      </div>
    </>
  );
};

export default DailyCalorieIntake;

// DailyCalorieIntake.defaultProps = {
//   notAllowedProducts: () => {},
//   dailyRate: () => {},
// };

DailyCalorieIntake.propTypes = {
  notAllowedProducts: PropTypes.func,
  dailyRate: PropTypes.func,
};
