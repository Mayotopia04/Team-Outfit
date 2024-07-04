import { useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import styles from './CalcForm.module.css';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import APIs from 'services/API/API';
import { calcSchema } from 'services/validation/calcSchema';

export default function CalcForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState('idle');
  const [dailyRateCalc, setDailyRateCalc] = useState(null);

  const { userId } = useParams();
  const context = useOutletContext();
  const currentValues = context?.userData || null;
  const setDailyRate = context?.setDailyRate;
  const savedValues = JSON.parse(window.localStorage.getItem('userParams'));
  const checkedBloodType = currentValues?.bloodType;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(calcSchema),
    defaultValues: savedValues || {
      height: currentValues?.height || null,
      age: currentValues?.age || null,
      weight: currentValues?.weight || null,
      desiredWeight: currentValues?.desiredWeight || null,
      bloodType: currentValues?.bloodType || null,
    },
  });

  const onSubmit = async (params) => {
    setState('pending');
    toast.dismiss();

    if (userId) {
      const { data } = await APIs.calculateDaylyAuthRequest(userId, params);
      context?.setNotAllowedProducts(data.notAllowedProducts);
      setDailyRate({
        dailyRate: data?.dailyRate || data?.summaries[0]?.dailyRate,
        kcalConsumed: data?.summaries[0]?.kcalConsumed,
        kcalLeft: data?.summaries[0]?.kcalLeft || data?.dailyRate,
        percentsOfDailyRate: data?.summaries[0]?.percentsOfDailyRate,
      });
    } else {
      window.localStorage.setItem('userParams', JSON.stringify(params));
      const { data } = await APIs.calculateDaylyRequest(params);
      setDailyRateCalc(data);
      setIsOpen(true);
    }

    setState('idle');
  };

  const { height, age, weight, desiredWeight, bloodType } = errors;
  const errorMessage = height?.message || age?.message || weight?.message || desiredWeight?.message || bloodType?.message;

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className={styles.Thumb}>
      <h1 className={styles.Title}>Calculate your daily calorie intake right now</h1>
      <form className={styles.FormStyled} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.LabelFirst}>
          <label className={styles.FormLabel} htmlFor="height">
            Height *
            <input className={styles.TextInp} id="height" {...register('height')} />
            <span className={styles.tooltiptext}>min. 100, max. 250</span>
          </label>

          <label className={styles.FormLabel} htmlFor="age">
            Age *
            <input className={styles.TextInp} id="age" {...register('age')} />
            <span className={styles.tooltiptext}>min. 18, max. 100</span>
          </label>

          <label className={styles.FormLabel} htmlFor="weight">
            Current weight *
            <input className={styles.TextInp} id="weight" {...register('weight')} />
            <span className={styles.tooltiptext}>min. 20, max. 500</span>
          </label>
        </div>

        <div className={styles.LabelFirst}>
          <label className={styles.FormLabel} htmlFor="desiredWeight">
            Desired weight *
            <input className={styles.TextInp} id="desiredWeight" {...register('desiredWeight')} />
            <span className={styles.tooltiptext}>min. 20, max. 500</span>
          </label>

          <label className={styles.FormLabel} htmlFor="bloodType">
            <p className={styles.BloodTitle}>Blood type*</p>
            <ul className={styles.List}>
              {[1, 2, 3, 4].map((type) => (
                <li key={type}>
                  <input
                    className={styles.RadioInp}
                    {...register('bloodType')}
                    id={`blood-inp-${type}`}
                    type="radio"
                    value={type}
                    checked={type === +(watch('bloodType') ?? checkedBloodType)}
                  />
                  <label htmlFor={`blood-inp-${type}`}>{type}</label>
                </li>
              ))}
            </ul>
          </label>
        </div>
        <div className={styles.ButtonCon}>
          <button className={styles.Button} type="submit">Start losing weight</button>
        </div>
      </form>
      {isOpen && dailyRateCalc && (
        <Modal {...{ setIsOpen, dailyRateCalc, isOpen }} />
      )}

      {state === 'pending' && <Loader />}
    </div>
  );
}
