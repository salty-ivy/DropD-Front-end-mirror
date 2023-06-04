import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/Button/button'
import TextField from '@mui/material/TextField';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import { UPDATE_PERSONAL_PROFILE } from '../../../axios/POST_API';
import { Button } from '@mui/material';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import TimelineNav from '../../../components/timelinenav/timelineNav'
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";
import { Country, State, City } from 'country-state-city';
import { Select } from '@mui/material';
import "./knowbetter.css"
import { useHistory } from 'react-router-dom';

function Knowbetter({ setSliderPage, handleProfileUpdate, profileData }) {
    const history = useHistory
    const spinner = useSpinner()
    const { t, i18n } = useTranslation();
    const [year, setYear] = useState();
    const [fullName, setFullName] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [maritalStatus, setMaritalStatus] = useState()
    const [languagePreference1, setLanguagePreference1] = useState()
    const [languagePreference2, setLanguagePreference2] = useState()
    const [languagePreference3, setLanguagePreference3] = useState()
    const [states, setStates] = useState()
    const [bio, setBio] = useState()


    const handleYOBChange = (event) => {
        console.log(event.target.value);
        setYear(event.target.value);
    };
    // let states
    //country and city related code
    const countries = Country.getAllCountries()
    console.log(countries)
    useEffect(() => {
        setStates(State.getStatesOfCountry(country))
        console.log(states, "statelist")
    }, [country])


    useEffect(() => {
        if (profileData) {
            setFullName(profileData.full_name)
            setYear(profileData.year_of_birth)
            setMaritalStatus(profileData.marital_status)
            setCountry(profileData.country)
            setCity(profileData.city)
            setLanguagePreference1(profileData.language_preference1)
            setLanguagePreference2(profileData.language_preference2)
            setLanguagePreference3(profileData.language_preference3)
            setBio(profileData.bio)
        }
    }, [])

console.log(country,"line 64")
    let age
    console.log(year, Number.isNaN(parseInt(year)), "YOB")
    if (!Number.isNaN(parseInt(year)) && year > 1900) {
        age = new Date().getFullYear() - year
    } else {
        age = ''
    }


    const handleKnowBetter = async () => {
        try {
            spinner.setLoadingState(true)
            await UPDATE_PERSONAL_PROFILE({ "full_name": fullName, "age": age, "year_of_birth": year, "country": country, "city": city, "marital_status": maritalStatus, "language_preference1": languagePreference1, "language_preference2": languagePreference2, "language_preference3": languagePreference3, "bio": bio })
            spinner.setLoadingState(false)
            setSliderPage("index")
        } catch (error) {
            console.log(error, "this is the error in zone updation")
        }
    }

    const handleNotifications = () => {
        history.push("/notifications")
    }

    const handleWallet = () => {
        history.push("/connectwallet")
    }
    const handleClick = () => {
        // console.log("timeline click",history)
        setSliderPage("index")
    }

    // const userDetails

    return (
        <div className='page-page-wrapper edit-user-details-page'>
            {/* <TimelineNav /> */}
            <div
                style={{ width: "100vw", height: "65px", backgroundColor: "white" }}
                className="navbar-wrapper"
            >
                <div style={{ display: "flex", width: "60vw" }}>
                    <div onClick={handleClick} style={{ position: "relative", top: "20px", left: "15px" }}>
                        <img src={leftarrow} alt="back" />
                    </div>
                    <div style={{ width: "auto" }}>
                        <img
                            style={{ position: "relative", left: "30px", top: "12px" }}
                            id="dropd-logo"
                            src={logo}
                            alt="dropd-logo"
                        />
                    </div>
                </div>
                <div style={{ width: "40vw" }}>
                    <div
                        style={{
                            display: "flex",
                            float: "right",
                            width: "100px",
                            justifyContent: "space-evenly",
                            position: "relative",
                            top: "20px",
                        }}
                    >
                        <div>
                            <img onClick={handleNotifications} src={notification} alt="money" />
                        </div>
                        <div>
                            <img onClick={handleWallet} src={Money} alt="money" />
                        </div>
                        <div>
                            <img src={search} alt="money" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="inner-pages-container">

                <div className="inner-pages-container-wrap">

                    <div class="main-wrap">
                        <div class="entry-wrap">
                            <h1 className="page-title">Edit Profile</h1>
                            <div className='knowbetter-description'>Personal Information</div>
                        </div>

                        <div class="content-wrap">
                            <div className="edit-personal-info-wrap">
                                <div className="field-wrap">
                                    <div className='input-support-text'>Full Name</div>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={fullName}
                                        onChange={(e) => { setFullName(e.target.value) }}
                                        size='small'

                                        sx={{
                                            width: '340px', "& .MuiOutlinedInput-root": {
                                                "& > fieldset": {
                                                    border: "none"
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-2-row">
                                    <div className="field-wrap">
                                        <div className='input-support-text'>Year of Birth</div>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size='small'
                                            onChange={handleYOBChange}
                                            value={year}
                                            sx={{
                                                width: '140px', "& .MuiOutlinedInput-root": {
                                                    "& > fieldset": {
                                                        border: "none"
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="field-wrap">
                                        <div className='input-support-text'>Age</div>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size='small'
                                            value={!Number.isNaN(age) && age}
                                            sx={{
                                                width: '140px', "& .MuiOutlinedInput-root": {
                                                    "& > fieldset": {
                                                        border: "none"
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="field-wrap">
                                    <div className='input-support-text'>Marital status</div>

                                    <select value={maritalStatus} onChange={(e) => { setMaritalStatus(e.target.value) }} className='marital-status' name="cars" id="cars">
                                        <option value=""></option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                        <option value="Open Marriage">Open Marriage</option>
                                    </select>
                                </div>

                                <div className="field-wrap">
                                    <div className='input-support-text'>Country</div>
                                    <select value={country} onChange={(e) => { setCountry(e.target.value) }} className='marital-status' name="cars" id="cars">
                                        {countries.map((item, index) => {
                                            return (<option value={item.isoCode}>{item.name.toLowerCase()}</option>)
                                        })}
                                    countries</select>
                                </div>

                                <div className="field-wrap">
                                    <div className='input-support-text'>Place of residence</div>
                                    <select value={city} onChange={(e) => { setCity(e.target.value) }} className='marital-status' name="cars" id="cars">
                                        {states?.map((item, index) => {
                                            return (<option value={item.name}>{item.name}</option>)
                                        })}
                                    </select>
                                </div>

                                <div className="language-selection">
                                    <div className='input-support-text'>Language Preferences</div>
                                    <div class="col-3-row">
                                        <div class="field-wrap">
                                            <select value={languagePreference1} onChange={(e) => { setLanguagePreference1(e.target.value) }} className='marital-status' name="cars" id="cars">
                                                <option value="Hindi">Hindi</option>
                                                <option value="English">English</option>
                                                <option value="Russian">Russian</option>
                                                <option value="Italian">Italian</option>
                                            </select>
                                        </div>

                                        <div className="field-wrap">
                                            <select value={languagePreference2} onChange={(e) => { setLanguagePreference2(e.target.value) }} className='marital-status' name="cars" id="cars">
                                                <option value="Hindi">Hindi</option>
                                                <option value="English">English</option>
                                                <option value="Russian">Russian</option>
                                                <option value="Italian">Italian</option>
                                            </select>
                                        </div>

                                        <div className="field-wrap">
                                            <select value={languagePreference3} onChange={(e) => { setLanguagePreference3(e.target.value) }} className='marital-status' name="cars" id="cars">
                                                <option value="Hindi">Hindi</option>
                                                <option value="English">English</option>
                                                <option value="Russian">Russian</option>
                                                <option value="Italian">Italian</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field-wrap">
                                    <div className='input-support-text'>Your bio</div>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        size='small'
                                        value={bio}
                                        onChange={(e) => { setBio(e.target.value) }}
                                        sx={{
                                            width: '340', "& .MuiOutlinedInput-root": {
                                                "& > fieldset": {
                                                    border: "none"
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="action-button-wrap">
                            <CustomButton onClick={() => { setSliderPage("index") }}>Cancel</CustomButton>
                            <CustomButton onClick={handleKnowBetter}>Update</CustomButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Knowbetter