import { useDispatch, useSelector } from 'react-redux';

import s from './DiaryProductsListItem.module.scss';

import { ReactComponent as Bin } from '../../../images/svg/removeBtn.svg';
import { FaTint } from 'react-icons/fa';

import { eatenProducts } from 'redux/day/day-selectors';
import { deleteEatenProduct } from 'redux/day/day-operations';
import { getUser, getID } from 'redux/auth/auth-selectors';

const DiaryProductsListItem = () => {
  const dispatch = useDispatch();

  const eatenProductsList = useSelector(eatenProducts);
  const userId = useSelector(getID);

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

  const checkBloodType = data => {
    if (!data[bloodType]) {
      return true;
    } else {
      return false;
    }
  };

  const removeProduct = id => {
    dispatch(deleteEatenProduct(id));
  };

  return (
    <>
      {eatenProductsList &&
        eatenProductsList.map(
          ({ id, title, weight, kcal, groupBloodNotAllowed }) => {
            return (
              <li key={id} className={s.item}>
                {checkBloodType(groupBloodNotAllowed) && (
                  <FaTint
                    className={s.myBloodIconTrue}
                    title="The product is suitable for your blood type"
                  />
                )}
                {!checkBloodType(groupBloodNotAllowed) && (
                  <FaTint
                    className={s.myBloodIconFalse}
                    title="The product is not suitable for your blood type"
                  />
                )}
                <p className={s.title}>{title}</p>
                <div className={s.wrapper}>
                  <p className={s.weight}>{weight} kg</p>
                  <p className={s.kcal}>{Math.round(kcal)} kcal</p>
                </div>
                <button
                  className={s.btnRemove}
                  type="button"
                  onClick={() => removeProduct(id)}
                >
                  <Bin />
                </button>
              </li>
            );
          }
        )}
    </>
  );
};

export default DiaryProductsListItem;
