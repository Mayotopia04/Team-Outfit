import React from 'react';
import PropTypes from 'prop-types';
import DiaryProductsItem from 'components/DiaryProductsItem';
import styles from './DiaryProductsList.module.css';

export default function DiaryProductsList({
  products,
  handleDeleteProduct,
  isDeliting,
}) {
  return (
    <>
      {products?.length > 0 ? (
        <ul className={styles.listProducts}>
          {products.map(product => (
            <DiaryProductsItem
              handleDeleteProduct={handleDeleteProduct}
              key={product.id}
              id={product.id}
              name={product.title}
              weight={product.weight}
              kcal={product.kcal}
              isDeliting={isDeliting === product.id}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.text}>Please, add product!</p>
      )}
    </>
  );
}

DiaryProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      kcal: PropTypes.number,
      title: PropTypes.string,
      weight: PropTypes.number,
    })
  ),
  handleDeleteProduct: PropTypes.func,
  isDeleting: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
