import { useEffect } from 'react';

import Button from 'components/Shared/Button';
import products from '../../products.json';
import s from './Modal.module.scss';

const data = JSON.parse(localStorage.getItem("unregisteredUser"));

// FORMULA FOR CALCULATING DAILY CALORIE NORMS FOR WOMEN 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desired weight)
  const calories = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161 - 10 * (data.weight - data.desiredWeight);
  const bloodType = data.bloodType;
  const nonRecommendedFoods = products.filter(product => product.groupBloodNotAllowed[bloodType] === true).map(product => product.title);

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

  return (
    <div className={s.modalContent}>
        <h2 className={s.modalTitle}>Your recommended daily calorie intake is</h2>
        <p className={s.modalCalories}>{calories} cal</p>
        <div className={s.modalFoodContainer}>
        <hr className={s.divider}/>
        <p className={s.modalFood}>Foods you should not eat</p>
        <ol className={s.modalFoodList}>
          {/* {nonRecommendedFoods.map(bannedFood => <li className={s.modalFoodListItem}>{bannedFood}</li>)} */}
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
