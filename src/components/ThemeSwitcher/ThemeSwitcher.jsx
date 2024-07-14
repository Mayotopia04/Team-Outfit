import { changeTheme } from "redux/themeswitcher/slice.themeswitcher";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "redux/themeswitcher/themeswitcher-selector";
import s from './Themeswitcher.module.css';
import { useEffect } from "react";


const ThemeSwitcher = () => {
    const dispatch = useDispatch();

    const selectedTheme = useSelector(getTheme);
    console.log(selectedTheme)

    const SwitchTheme = () => {
        dispatch(changeTheme());
    }

    const setThemeColors = (theme) => {
        const root = document.documentElement;
        switch (theme) {
            case 'dark':
                root.style.setProperty('--main-color', '#ffffff');
                root.style.setProperty('--second-color', '#7070ce');
                root.style.setProperty('--bg-color', '#2d2f30');
                root.style.setProperty('--scroll-color', '#181717');
                root.style.setProperty('--third-color', '#ffff');
                root.style.setProperty('--input-color', '#FFD35A');
                root.style.setProperty('--option-color', '#EB5B00');
                // Add other color properties for dark theme

                break;

            default:
                root.style.setProperty('--main-color', '#212121');
                root.style.setProperty('--second-color', '#9b9faa');
                root.style.setProperty('--bg-color', '#fff');
                root.style.setProperty('--scroll-color', '#f0f1f3');
                root.style.setProperty('--third-color', '#264061');
                root.style.setProperty('--input-color', '#9b9faa');
                root.style.setProperty('--option-color', '#fbc0414d');
                break;
        }
    };

    useEffect(() => {
        setThemeColors(selectedTheme)
    }, [selectedTheme]);


    return (
        <div className={s.wrapper}>
            <label id="switch" className={s.switch}>
                <input type="checkbox" onChange={SwitchTheme} checked={selectedTheme === 'light'} id="slider" />
                <span className={`${s.slider} ${s.round}`}></span>
            </label>
        </div>
    );
};

export default ThemeSwitcher;
