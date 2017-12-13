import React from 'react';
//import logoImg from '../../assets/images/logoW.png';
import classNames from 'classnames';
import logo from '../../../assets/images/logo.png'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// {logoImg}

class Header extends React.Component{ 
    render(){
        return (
        <div className="settings_header">
            <div className="settings_header__logo">
                <img src={logo} alt=""/> 
                <span> wristo </span>
            </div>
            <div className="settings_header__menu__wrap">
            <div className="settings_header__menu">
                <Link to="/" className="settings_header__menu__item">
                    <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <a className="settings_header__menu__item__link" href="#"> OVERVIEW </a>
                </Link>
                <Link to="signup" className="settings_header__menu__item">
                    <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <a className="settings_header__menu__item__link" href="#"> REMINDERS </a>
                </Link>
                <Link to="login" className="settings_header__menu__item">
                    <svg className="settings_header__menu__item__icon"  fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                    
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                 </svg>
                    
                    <div className="settings_notificationDot">
                    <svg width="12" height="12">
                    <circle r="6" cx="6" cy="6"
                    fill="#bf0050"/>
                    </svg>
                    </div> 
                    <Link to="settings" className="settings_header__menu__item__link" > NOTIFICATIONS </Link>
                    
                </Link>
                <Link to="settings" className="settings_header__menu__item">
                    <svg className="settings_header__menu__item__icon" fill="#FFFFFF" height="29.5" viewBox="0 0 24 24" width="29.5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                    </svg>
                    <a  className="settings_header__menu__item__link"> SETTINGS </a>
                </Link>
            </div>
            </div>
            <div className="settings_header__profile">
                <div className="settings_header__profile__logo">
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW4ytGaB2CQdvs-uQ5wZ3hX2Kjq3ZPRoHO47sFmyk3Qv6j_iDG" alt="" />
                </div>
            </div>
        </div>
        );
    }
}



export default Header;