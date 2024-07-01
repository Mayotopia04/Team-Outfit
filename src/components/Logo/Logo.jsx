import { useMedia } from 'react-use';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from 'redux/auth/authSlice';
import { routes } from 'utils/routes';
import logoMobile from 'assets/logo/logo-mobile.png';
import logoTablet from 'assets/logo/logo-tablet.png';
import logoDesktop from 'assets/logo/logo-desktop.png';
import style from './Logo.module.scss';

export const Logo = () => {
  const isMobile = useMedia('(max-width: 767px)');
  const isTablet = useMedia('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMedia('(min-width: 1280px)');
  const isAuth = useSelector(selectAuthStatus);

  const getLogo = () => {
    if (isMobile) {
      return logoMobile;
    } else if (isTablet) {
      return logoTablet;
    } else if (isDesktop) {
      return logoDesktop;
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <div>
          <Link to={isAuth ? routes.calculator : routes.home}>
            <img src={getLogo()} alt="logo" />
          </Link>
        </div>
      </div>
      {isDesktop && <div className={style.line}></div>}
    </>
  );
};
