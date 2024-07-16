import s from './DevelopersPage.module.css';
import { Container, Modal } from 'components';
import { getPersonaInfo } from '../../services/api/developers';
import { useEffect, useState } from 'react';
import teamOutfitImage from '../../assets/png/teamOutfit_Logotxt.png'
import { updateModalStatus } from 'redux/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { getModalStatus } from 'redux/auth/auth-selector';
import { ModalDeveloper } from 'components/Modal/ModalDeveloper';

const DevelopersPage = () => {
  const [dataDev, setDataDev] = useState(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  useEffect(() => {
    getPersonaInfo().then(data => {
      setDataDev(data);
    });
  }, []);

  const dispatch = useDispatch();
  const showModal = useSelector(getModalStatus);

   const toggleModal = () => {
     dispatch(updateModalStatus(!showModal));
      document.body.style.overflowY = 'visible';
  };

  const getDeveloper = ({ avatarURL, name, email, position, _id ,defaultURL}) => {
   const developer = { avatarURL, name, email, position, _id, defaultURL }
    setSelectedDeveloper(developer);
    toggleModal();
  }
  
  const elements = dataDev?.map(({ avatarURL, name, email, position, _id, defaultURL }) => (
    <li className={s.item} key={_id} onClick={()=>getDeveloper({ avatarURL, name, email, position, _id ,defaultURL})}>
      <img className={s.img} src={avatarURL}  alt={defaultURL} width={250}/>
      <p className={s.devName}>{name}</p>
      <p className={s.text}>{position}</p>
    </li>
  ));

  return (
    <div>
      {dataDev && (
        <Container>
          <div className={s.container}>
            <article className={s.page}>
              <h1 className={s.title}>Team
                <img src={teamOutfitImage} alt="Team OutFit" className={s.teamOutfitImage} width={100} />
              </h1>
              <ul className={s.list}>{elements}</ul>
            </article>

          </div>
        </Container>
      )}
      {showModal && <Modal onClose={ toggleModal} component={<ModalDeveloper developer={selectedDeveloper} />}/>}
    </div>

  );
};

export default DevelopersPage;
