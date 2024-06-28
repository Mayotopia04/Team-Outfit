import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import s from './DairyPage.module.scss';

import SideBar from 'components/SideBar';
import Button from 'components/Shared/Button';
import DiaryAddProductForm from '../../components/Dairy/DiaryAddProductForm';
import DiaryCreateProductForm from '../../components/Dairy/DiaryCreateProductForm';
import DiaryDateСalendar from '../../components/Dairy/DiaryDateСalendar';
import DiaryProductsList from '../../components/Dairy/DiaryProductsList';
import Modal from 'components/Modal';
import GreetingForm from 'components/GreetingForm';

import { getNotAllowedProducts } from 'redux/auth/auth-selectors';
import { getUser } from 'redux/auth/auth-selectors';
import { dailyRateUser } from 'redux/daily-rate/daily-rate-operations';

function isFirstLoading(firstLoading, _id) {
  if (!firstLoading) {
    return false;
  }
  if (firstLoading) {
    const savedData = JSON.parse(localStorage.getItem('unregisteredUser'));
    if (!savedData) {
      return true;
    }
    if (savedData && _id) {
      localStorage.setItem(`user_${_id}_userData`, JSON.stringify(savedData));
      return false;
    }
    return false;
  }
}

const DairyPage = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletDesktop = useMediaQuery({ minWidth: 767 });
  const { _id } = useSelector(getUser);

  const notAllowedProduct = useSelector(getNotAllowedProducts);
  const firstLoading = notAllowedProduct?.length === 0;

  const loading = isFirstLoading(firstLoading, _id);

  useEffect(() => {
    if (loading || !_id) {
      return;
    } else {
      const userData = JSON.parse(localStorage.getItem(`user_${_id}_userData`));
      dispatch(dailyRateUser({ _id, ...userData }));
      localStorage.removeItem('unregisteredUser');
    }
  }, [dispatch, loading, _id]);

  const handleClick = () => {
    document.querySelector('body').classList.add('no-scroll');
    setModalOpen(true);
  };

  return (
    <main className={s.wrapper}>
      {firstLoading && <GreetingForm />}
      {!firstLoading && (
        <div className={s.overlay}>
          <div>
            <DiaryDateСalendar />
            <div className={s.itemBlock}>
              {isTabletDesktop && <DiaryAddProductForm />}
              <DiaryProductsList />
            </div>
          </div>
          {isMobile && (
            <div className={s.btn}>
              <Button
                text="+"
                btnClass="btnPlus"
                type="button"
                handleClick={handleClick}
              />
            </div>
          )}
          <DiaryCreateProductForm />
          {modalOpen && (
            <Modal
              setModalOpen={setModalOpen}
              overlayClass="overlayDairyPage"
              modalClass="modalDairyPage"
              children={<DiaryAddProductForm setModalOpen={setModalOpen} />}
            />
          )}
        </div>
      )}
      <SideBar />
    </main>
  );
};

export default DairyPage;
