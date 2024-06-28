import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import s from './CalcForm.module.scss';

import SideBar from 'components/SideBar';
import TextField from '../Shared/TextField/TextField';
import { field } from '../Shared/TextField/fields';
import Button from '../Shared/Button/Button';
import TextFieldDefault from 'components/Shared/TextFieldDefault/TextFieldDefault';

import { dailyRateUser } from 'redux/daily-rate/daily-rate-operations';
import { getUser } from 'redux/auth/auth-selectors';

const CalcForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id } = useSelector(getUser);

  let userData = {};
  const dataFromUser = useSelector(getUser);
  if (dataFromUser.userData) {
    userData = dataFromUser.userData;
  } else if (!Object.entries(dataFromUser).length) {
    userData = JSON.parse(localStorage.getItem(`user_${_id}_userData`)) || {};
  }

  const [bloodType, setBloodType] = useState(userData.bloodType - 1);

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      weight: userData && userData.weight ? userData.weight : '',
      height: userData && userData.height ? userData.height : '',
      age: userData && userData.age ? userData.age : '',
      desiredWeight:
        userData && userData.desiredWeight ? userData.desiredWeight : '',
      bloodType: userData && userData.bloodType ? userData.bloodType : '',
    },
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    const numberData = {
      weight: Number(data.weight),
      height: Number(data.height),
      age: Number(data.age),
      desiredWeight: Number(data.desiredWeight),
      bloodType: Number(data.bloodType),
    };

    localStorage.setItem(`user_${_id}_userData`, JSON.stringify(numberData));
    dispatch(dailyRateUser({ _id, ...numberData }));
    reset();
    navigate('/dairy');
  };

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h1 className={s.title}>
          Calculate your daily calorie intake right now
        </h1>
        <div className={s.formParts}>
          <div className={s.formPart}>
            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  name={'height'}
                  control={control}
                  handleChange={onChange}
                  {...field.height}
                />
              )}
            />
            <Controller
              control={control}
              name="age"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  name={'age'}
                  control={control}
                  handleChange={onChange}
                  {...field.age}
                />
              )}
            />
            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  name={'weight'}
                  control={control}
                  handleChange={onChange}
                  {...field.weight}
                />
              )}
            />
          </div>
          <div className={s.formPart}>
            <Controller
              control={control}
              name="desiredWeight"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  name={'desiredWeight'}
                  control={control}
                  handleChange={onChange}
                  {...field.desiredWeight}
                />
              )}
            />
            <Controller
              control={control}
              name="bloodType"
              render={({ field: { onChange, value } }) => (
                <TextFieldDefault
                  value={value}
                  control={control}
                  handleChange={onChange}
                  {...field.bloodType}
                />
              )}
            />

            <div className={s.radioBlock}>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className={s.listRadio}>
                  <label className={s.label}>
                    <input
                      {...register('bloodType', { required: true })}
                      className={s.checkbox}
                      type="radio"
                      name="bloodType"
                      checked={bloodType === idx}
                      onClick={() => setBloodType(idx)}
                      value={idx + 1}
                      placeholder="Blood type"
                    />
                    <span className={s.fake}></span>
                    <span className={s.text}>{idx + 1}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.buttonPosition}>
          <Button text="Calculate" type="submit" btnClass="btn" />
        </div>
      </form>
      <SideBar />
    </div>
  );
};

export default CalcForm;
