import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import s from './GreetingForm.module.scss';

import { getUserName } from 'redux/auth/auth-selectors';

export default function GreetingForm() {
  const userName = useSelector(getUserName);
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Good day, {userName}</h1>
      <p className={s.text}>
        Our app offers you to follow a diet and calculate calories. Go to the
        calculator section and calculate the diet.
      </p>
      <div className={s.btn}>
        <Link to="/calculator-calories" className={s.btnGreeting}>
          Calculate the diet
        </Link>
      </div>
    </div>
  );
}
