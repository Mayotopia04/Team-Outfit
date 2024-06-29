import { useEffect } from 'react';

import Button from 'components/Shared/Button';
import s from './Modal.module.scss';

const FoodModal = ({
  setModalOpen,
  overlayClass = 'overlay',
  modalClass = 'modal',
  children,
}) => {
  useEffect(() => {
    const onEscPush = e => {
      if (e.code !== 'Escape') {
        return;
      }
      removeNoScrollClassList();
      setModalOpen(false);
    };

    window.addEventListener('keydown', onEscPush);

    return () => {
      window.removeEventListener('keydown', onEscPush);
    };
  }, [setModalOpen]);

  function removeNoScrollClassList() {
    document.querySelector('body').classList.remove('no-scroll');
  }

  const closeModal = () => {
    removeNoScrollClassList();
    setModalOpen(false);
  };

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      removeNoScrollClassList();
      setModalOpen(false);
    }
  };

  return (
    <div className={s.modalContent}>
        <h2 className={s.modalTitle}>Your recommended daily calorie intake is</h2>
        <p className={s.modalCalories}>2800 kcal</p>
        <div className={s.modalFoodContainer}>
        <hr className={s.divider}/>
        <p className={s.modalFood}>Foods you should not eat</p>
        <ol className={s.modalFoodList}>
            <li className={s.modalFoodListItem}>Flour products</li>
            <li className={s.modalFoodListItem}>Milk</li>
            <li className={s.modalFoodListItem}>Red meat</li>
            <li className={s.modalFoodListItem}>Smoked meats</li>
        </ol>
        </div>
        <Button
          text="Start losing weight"
          type="button"
          btnClass="btn"
        />
    </div>
  );
};

export default FoodModal;
