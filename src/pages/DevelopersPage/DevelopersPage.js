import s from './DevelopersPage.module.css';
import { Container } from 'components';
import { getPersonaInfo } from '../../services/api/developers';
import { useEffect, useState } from 'react';
import teamOutfitImage from '../../assets/png/teamOutfit_Logotxt.png'

const DevelopersPage = () => {
  const [dataDev, setDataDev] = useState(null);

  useEffect(() => {
    getPersonaInfo().then(data => {
      setDataDev(data);
    });
  }, []);

  const elements = dataDev?.map(({ avatarURL, name, position, _id ,defaultURL}) => (
    <li className={s.item} key={_id}>
      <img className={s.img} src={avatarURL} alt={defaultURL} width={250} />
      <p className={s.devName}>{name}</p>
      <p className={s.text}>{position}</p>
    </li>
  ));

  return (
    dataDev && (
      <Container>
        <div class={s.container}>
          <article className={s.page}>
            <h1 className={s.title}>Team
              <img src={teamOutfitImage} alt="Team OutFit" className={s.teamOutfitImage} width={100} />
            </h1>
            <ul className={s.list}>{elements}</ul>
          </article>
        </div>
      </Container>
    )
  );
};

export default DevelopersPage;
