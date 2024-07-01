

import React from 'react';
import PropTypes from 'prop-types';
import styles from './DiaryProductsItem.module.css';

export default function DiaryProductsItem({
  name,
  weight,
  kcal,
  id,
  handleDeleteProduct,
  isDeleting,
}) {
  const onDeleteClick = () => {
    handleDeleteProduct(id);
  };

  return (
    <li className={styles.itemProducts}>
      <p className={styles.productName}>{name}</p>
      <span className={styles.weight}>{weight} g</span>
      <span className={styles.kcal}>{Math.round(kcal)} kcal</span>
      <button
        className={styles.buttonDelete}
        type="button"
        disabled={isDeleting}
        onClick={onDeleteClick}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L13 13" strokeWidth="2" />
          <path d="M1 13L13 1" strokeWidth="2" />
        </svg>
      </button>
    </li>
  );
}

DiaryProductsItem.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  kcal: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};
