import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import s from './DiaryChooseProductList.module.scss';

import LoaderMini from 'components/LoaderMini';

import { getProduct } from 'redux/product-search/search-selectors';
import { getSearchLoading } from 'redux/product-search/search-selectors';
import { postEatenProduct } from 'redux/day/day-operations';

export default function DiaryChooseProductList({
  handleClickClose,
  setModalOpen,
}) {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [isOpen, setIsOpen] = useState(false);
  const searchProduct = useSelector(getProduct);
  const dairyCalendar = useSelector(({ dairyCalendar }) => dairyCalendar);
  const searchLoading = useSelector(getSearchLoading);

  const handleClick = productId => {
    dispatch(postEatenProduct({ ...dairyCalendar, productId }));
    setIsOpen(false);
    handleClickClose(false);
    if (isMobile) {
      setModalOpen(false);
      document.querySelector('body').classList.remove('no-scroll');
    }
  };

  return (
    <>
      {searchLoading === true ? (
        <LoaderMini />
      ) : (
        <>
          {!isOpen && (
            <div className={s.overlay}>
              <h2 className={s.headTitle}>Select a product:</h2>
              <ul className={s.list}>
                {searchProduct.map(({ _id, title, calories, weight }) => (
                  <li
                    key={_id}
                    className={s.item}
                    onClick={() => handleClick(_id)}
                  >
                    <p className={s.title}> {title}</p>
                    <div className={s.wrapper}>
                      <p className={s.weight}>{weight} g</p>
                      <p className={s.kcal}>{calories} kcal</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}
