import React,{useContext} from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import '../styles/footer.css'


function Footer() {
 const {darkMode,setDarkMode} = useContext(ThemeContext)

    return(
        <div className={darkMode ? "footer-container" : "footer-container footer-light"}>
            All rights reserved.
        </div>
    )
}

export default Footer