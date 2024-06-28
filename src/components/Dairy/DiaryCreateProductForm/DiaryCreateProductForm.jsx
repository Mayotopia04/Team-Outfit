import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { ErrorMessage } from '@hookform/error-message';

import s from './DiaryCreateProductForm.module.scss';

import Button from '../../Shared/Button/Button';
import { ReactComponent as Warning } from 'images/svg/warning.svg';
import TextFieldDefault from 'components/Shared/TextFieldDefault/TextFieldDefault';
import { addNewProduct } from 'redux/product-search/search-operations';
import { getUser, getID } from 'redux/auth/auth-selectors';
import { getMessage } from 'redux/product-search/search-selectors';
import { clearProduct } from 'redux/product-search/search-slice';

const DiaryCreateProductForm = () => {
  const dispatch = useDispatch();

  const [isWarning, setIsWarning] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletDesktop = useMediaQuery({ minWidth: 768 });

  const userId = useSelector(getID);
  const message = useSelector(getMessage);

  const clearWarning = () => {
    setIsWarning(null);
  };

  useEffect(() => {
    if (message) {
      setIsWarning(message);
      const timerId = setTimeout(clearWarning, 5000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [message]);

  let bloodType;
  const { userData } = useSelector(getUser);

  if (userData && Object.keys(userData).length > 0) {
    bloodType = userData.bloodType;
  } else {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem(`user_${userId}_userData`)
    );
    if (
      userDataFromLocalStorage &&
      Object.keys(userDataFromLocalStorage).length > 0
    ) {
      bloodType = userDataFromLocalStorage.bloodType;
    } else {
      bloodType = { bloodType: null };
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: '',
      calories: '',
    },
  });

  const checkGroupBlood = data => {
    const typeBloodForm = {};
    for (let i = 0; i < 5; i++) {
      if (i === parseInt(data)) {
        typeBloodForm[i] = false;
      } else {
        typeBloodForm[i] = true;
      }
      if (i === 0) {
        typeBloodForm[i] = null;
      }
    }
    return typeBloodForm;
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const productData = {
      weight: 100,
      title: data.query,
      calories: data.calories,
      groupBloodNotAllowed: checkGroupBlood(bloodType),
      userId: userId,
    };
    dispatch(addNewProduct(productData));
    dispatch(clearProduct());
    reset();
  };

  return (
    <>
      <div className={s.wrapper}>
        <h3 className={s.title}>Add a new product to the database</h3>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.overlayLabel}>
            <Controller
              control={control}
              name="query"
              render={({ field: { onChange, value } }) => (
                <TextFieldDefault
                  value={value}
                  placeholder={'Product Name'}
                  name={'query'}
                  control={control}
                  handleChange={onChange}
                />
              )}
            />

            <ErrorMessage
              errors={errors}
              name="query"
              render={({ message }) => (
                <div className={s.errorOverlay}>
                  <Warning />
                  <p className={s.errorMessage}>{message}</p>
                </div>
              )}
            />
          </div>

          <div className={s.overlayLabel}>
            <Controller
              control={control}
              name="calories"
              render={({ field: { onChange, value } }) => (
                <TextFieldDefault
                  value={value}
                  placeholder={'kcal/100 g'}
                  name={'calories'}
                  pattern="[0-9]+"
                  control={control}
                  handleChange={onChange}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="calories"
              render={({ message }) => (
                <div className={s.errorOverlay}>
                  <Warning />
                  <p className={s.errorMessage}>{message}</p>
                </div>
              )}
            />
          </div>

          {isWarning && isMobile && (
            <p className={s.text_message}>{isWarning}</p>
          )}

          <div className={s.btn}>
            {isMobile && <Button text={'Add'} btnClass={'btn'} />}
            {isTabletDesktop && <Button text={'+'} btnClass={'btnPlus'} />}
          </div>
        </form>
        {isWarning && isTabletDesktop && (
          <p className={s.text_message}>{isWarning}</p>
        )}
      </div>
    </>
  );
};

export default DiaryCreateProductForm;
