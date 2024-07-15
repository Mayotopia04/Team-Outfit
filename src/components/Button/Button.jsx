import PropTypes from 'prop-types';

import s from '../Button/Button.module.css';

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
