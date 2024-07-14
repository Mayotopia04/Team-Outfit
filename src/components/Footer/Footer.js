import { Link } from 'react-router-dom';
import s from './Footer.module.css';
import 'animate.css';
import teamLogo from '../../assets/png/teamOutfit_Logo.png';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContent}>
        <p>
          Copyright © {new Date().getFullYear()} GoIT. Created by{' '}
          <Link className={s.link + ' animate__shakeY'} to={'/developers'}>
            Team <img className={s.teamLogo} src={teamLogo} alt="team logo" />
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
