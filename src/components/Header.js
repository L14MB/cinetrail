import React,{useContext} from 'react'
import '../styles/header.css'
import {Link,useNavigate} from 'react-router-dom'
import { MdOutlineDarkMode,MdOutlineLightMode } from 'react-icons/md';
import { ThemeContext } from '../contexts/ThemeContext';


function Header() {

let navigate = useNavigate();
const {darkMode,setDarkMode} = useContext(ThemeContext)


const handleTheme =  () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode',!darkMode)
}

    return (
        <div className={darkMode ? 'header-container' : 'header-container header-light'}>
            <Link className='logo' to="/">CineTrail</Link>
            <div className='search-container'>
                <input className='search-input' placeholder='Search movies...'/>
        </div>
        <div className='header-buttons-container'>
            <div className='theme-button-container'>

                {
                    darkMode
                    ? <div className='theme-buttons'>
                        <MdOutlineLightMode onClick={handleTheme} className='theme-icon'/>
                        <MdOutlineDarkMode className='theme-icon theme-icon-active'/>
                      </div>
                    : <div className='theme-buttons'>
                        <MdOutlineLightMode className='theme-icon theme-icon-active'/>
                        <MdOutlineDarkMode onClick={handleTheme} className='theme-icon'/>
                      </div>
                }
            </div>
            <div>
                <button className='create-account-btn' onClick={()=>navigate('/signup')}>Create an account</button>
            </div>
        </div>
        </div>
    )
}

export default Header