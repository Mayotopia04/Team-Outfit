import React from 'react';
import PropTypes from 'prop-types';
import s from './DiaryAddModalBtn.module.css';

export default function DiaryAddModalBtn({
  onClick,
  type = 'submit',
  errorState,
  state,
}) {
  return (
    <button
      type={type}
      disabled={errorState}
      onClick={onClick}
      className={s.addBtn}
      style={{
        backgroundColor: errorState ? 'rgba(255, 99, 71, 0.8)' : '#fc842d',
        border: errorState ? 'none' : undefined,
        boxShadow: errorState ? 'none' : '0px 4px 10px rgba(252, 132, 45, 0.5)',
      }}
    >
      <svg
        className={s.cross}
        style={{
          animationName: state === 'pending' ? 'rotate' : 'none',
        }}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.72 7.96003H7.95997V13.72H6.03997V7.96003H0.279968V6.04003H6.03997V0.280029H7.95997V6.04003H13.72V7.96003Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

DiaryAddModalBtn.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  state: PropTypes.string,
  errorState: PropTypes.bool,
};
