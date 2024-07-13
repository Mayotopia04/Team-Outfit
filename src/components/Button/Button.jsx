import PropTypes from 'prop-types';

import s from '../Button/Button.module.css';

// The button accepts 4 props.

// 1. text = Required props button text.
// 2. isPrimaryButton = Optional props, default is true if you want the
//  which the background is white and the border orange transmit isPrimaryButton={false}.
// 3. width = Required minimum prop size,
//  since one Add button, login/registration buttons,
//  different width calculator buttons.
// 4. onClick =  props action when clicking.



const Button = ({ text, isPrimaryButton = true, width, onClick, isDisabled = false }) => {
  const buttonClass = isPrimaryButton ? s.primaryButton : s.secondaryButton;

  return (
    <button
      onClick={onClick}
      style={{ minWidth: width }}
      disabled={isDisabled}
      type="submit"
      className={buttonClass}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isPrimaryButton: PropTypes.bool,
  isDisabled: PropTypes.bool,
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Button;
