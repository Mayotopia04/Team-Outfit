import { changeTheme } from "redux/slimDaddy/slice.slimDaddy";
import { useDispatch, useSelector } from "react-redux"; 
import { getTheme } from "redux/slimDaddy/selectors.slimDaddy";
import s from './Themeswitcher.module.css';


const ThemeSwitcher = () => {
    const dispath = useDispatch();

    const selectedTheme = useSelector(getTheme);
 console.log(selectedTheme)
   
    const SwitchTheme = () => {    
        dispath(changeTheme());   
    }
  
     const setThemeColors = (theme) => {
    const root = document.documentElement;
    switch (theme) {
         case 'dark':
        root.style.setProperty('--main-color', '#ffffff');
            root.style.setProperty('--second-color', '#264061');
            root.style.setProperty('--bg-color', '#353535');
              root.style.setProperty('--scroll-color', '#181717');
            root.style.setProperty('--accent-color', '#40367b');
            root.style.setProperty('--btn-box-shadow', '0px 4px 10px rgba(6, 6, 45, 0.247)');
            // Add other color properties for dark theme
            break;
        
        default:
             root.style.setProperty('--main-color', '#212121');
            root.style.setProperty('--second-color', '#9b9faa');
            root.style.setProperty('--bg-color', '#fff');
            root.style.setProperty('--scroll-color', '#f0f1f3');
            root.style.setProperty('--accent-color', '#fc842d');
            root.style.setProperty('--btn-box-shadow', '0px 4px 10px rgba(252, 132, 45, 0.5)');
        break;
        }
  };


  setThemeColors(selectedTheme);  


    return (
        <div className={s.wrapper}>
            <span className={`${s.toggleLabel} ${selectedTheme === 'light' ? s.lightText : s.darkText}`}>SlimMom</span>
            <label className={s.toggle}>
                <input className={s.toggleCheckbox} checked={selectedTheme === 'dark'} onChange={SwitchTheme} type="checkbox" />
                <div className={s.toggleSwitch}></div>
                <span className={`${s.toggleLabel} ${selectedTheme === 'light' ? s.darkText : s.lightText}`}>SlimDaddy</span>
            </label>
        </div>
    );
}

export default ThemeSwitcher;