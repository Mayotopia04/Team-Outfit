import s from './BurgerMenu.module.css';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { links } from '../UserNav/links';

const getLinkClassName = ({ isActive }) => {
  return isActive ? s.activeLink : s.link;
};
const modalNav = document.querySelector('#modal-nav');

const BurgerMenu = ({ toggleNavMenu }) => {
  const elements = links
    .filter(item => item.private)
    .map(({ id, to, text }) => (
      <li className={s.item} key={id}>
        <NavLink className={getLinkClassName} to={to} onClick={() => toggleNavMenu()}>
          {text}
        </NavLink>
      </li>
    ));
  return createPortal(
    <div className={s.overlay}>
      <div className={s.menuContent}>
        <ul className={s.nav}>{elements}</ul>
      </div>
    </div>,
    modalNav
  );
};

export default BurgerMenu;
