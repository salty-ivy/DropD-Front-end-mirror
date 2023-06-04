import React, { useEffect } from 'react'
import "./signup.css"
import logo from "../../assets/images/dropdsmall.svg"
import search from "../../assets/images/search.svg"
import attributes from "../../assets/images/attributes.png"
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function Signup() {
    const { t, i18n } = useTranslation();
    const handleCreate =()=>{
        history.push("/create")
    }

    const handleLogin = () =>{
        history.push("/login")

    }
    const history=useHistory()
    useEffect(() => {
        if(localStorage.getItem("token")){
            history.push("/timeline")
        }
    },[])
    return (
        <div className='signup-container'>
            <div className='navbar-wrapper'>
                <div style={{ width: '300px' }}><img style={{ position: "relative", left: '20px', top: '10px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
                <div style={{ float: 'right' }}><img style={{ position: "relative", left: '20px', top: '20px' }} src={search} alt="search" /></div>
            </div>
            <div className='data-box'>

            </div>
            <div className='feature-box'>
                <img src={attributes} alt="attributes" />
            </div>
            <div className='button-container'>
                <div><button onClick={handleCreate} className='signup-button' variant='contained'>{t('create.1')}</button></div>
                <div style={{ paddingLeft: '20px' }}><button onClick={handleLogin} className='signup-button' variant='contained'>{t('login.1')}</button></div>
            </div>
            <div className='signup-footer'>
                <div className='footer-item'>{t('project.1')}</div>
                <div className='footer-item'>{t('team.1')}</div>
                <div className='footer-item'>{t('roadmap.1')}</div>
                <div className='footer-item'>{t('faq.1')}</div>
            </div>
        </div>
    )
}

export default Signup;