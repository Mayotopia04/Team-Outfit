import React from 'react'
import s from '../Modal/ModalDeveloper.module.css';


export const ModalDeveloper = ({developer}) => {
    
    return (
        <div className={s.wrapper}>
            <div className={s.modalContent}>
                <img className={s.img } src={developer.avatarURL} alt={developer.name} width={250} />
                <h2 className={s.name}>{developer.name }</h2>
                <p className={s.email}>Email: {developer.email}</p>
                <p className={s.position}>Position: {developer.position}</p>
              </div>
        </div>
    )
};
