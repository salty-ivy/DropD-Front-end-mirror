import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import Simpleinput from '../../../components/simpleinput/simpleinput';
import TextField from '@mui/material/TextField';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import { UPDATE_PERSONAL_PROFILE } from '../../../axios/POST_API';
import { Button } from '@mui/material';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import Languages from '../../../utils/Languages/Languages';
import { Country, State, City } from 'country-state-city';
import "./knowbetter.css"

function Knowbetter({ setSliderPage, handleProfileUpdate }) {
    const spinner = useSpinner()
    const { t, i18n } = useTranslation();
    const [year, setYear] = useState();
    const [fullName, setFullName] = useState()
    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)
    const [maritalStatus, setMaritalStatus] = useState("")
    const [languagePreference1, setLanguagePreference1] = useState("Hindi")
    const [languagePreference2, setLanguagePreference2] = useState()
    const [languagePreference3, setLanguagePreference3] = useState()
    const [states, setStates] = useState()
    const [personaldetailsError, setPersonalDetailsError] = useState()
    const [bio, setBio] = useState()


    //country and city related code
    const countries = Country.getAllCountries()
    console.log(countries)
    useEffect(() => {
        setStates(State.getStatesOfCountry(country))
        console.log(states, "statelist")
    }, [country])



    console.log(country, "selected country")

    const handleYOBChange = (event) => {
        console.log(event.target.value);
        setYear(event.target.value);
    };

    let age
    console.log(year, Number.isNaN(parseInt(year)), "YOB")
    if (!Number.isNaN(parseInt(year)) && year > 1900) {
        age = new Date().getFullYear() - year
    } else {
        age = ''
    }
    console.log(age)

    const handleKnowBetter = async () => {
        if (country == "" || country == null) {
            setPersonalDetailsError("Please enter your country")
        }
        if (maritalStatus == "" || maritalStatus == null) {
            setPersonalDetailsError("please enter your marital status")
        }
        else if (city == "" || city == null) {
            setPersonalDetailsError("Please enter our city")
        }
        else {
            try {
                spinner.setLoadingState(true)
                await UPDATE_PERSONAL_PROFILE({ "full_name": fullName, "age": age, "year_of_birth": year, "country": country, "city": city, "marital_status": maritalStatus, "language_preference1": languagePreference1, "language_preference2": languagePreference2, "language_preference3": languagePreference3 })
                spinner.setLoadingState(false)
                setSliderPage("walletconnect")
            } catch (error) {
                console.log(error, "this is the error in details updation")
            }
        }
    }

    // const countries = csc.getAllCountries();

    const handleBack = () => {
        setSliderPage("zone")
    }
    return (
        <div className='knowbetter-wrapper'>
            {/* <Userdetailsnav/> */}
            <div className='navbar-wrapper'>
                <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-15px' }}><img src={leftarrow} alt="back" /></div>
                <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '0px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
            </div>
            <div class="main-wrap">
                <div class="entry-wrap">
                    <div className='knowbetter-text-container'>
                        <div className='knowbetter-text'>
                            Lets Know You Better
                        </div>
                    </div>
                    <div className='knowbetter-description'>Some text here dummy text right now</div>
                </div>

                <div class="content-wrap">
                    <div className='knowbetter-input-box-wrapper'>
                        <div>
                            <div className='input-support-text' style={{ fontSize: '10px', fontWeight: '400' }}>Full Name</div>
                            <div style={{ marginBottom: '20px' }}>
                                <div>
                                    <div>
                                        <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
                                            id="outlined-basic"
                                            variant="outlined"
                                            size='small'
                                            onChange={(e) => { setFullName(e.target.value) }}
                                            sx={{
                                                width: '300px', "& .MuiOutlinedInput-root": {
                                                    "& > fieldset": {
                                                        border: "none"
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div>
                                <div className='input-support-text'>Year of Birth</div>
                                <div>
                                    <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size='small'
                                        onChange={handleYOBChange}
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
                            <div>
                                <div className='input-support-text'>Age</div>
                                <div>
                                    <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
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
                        </div>
                        <div className='input-support-text'>
                            marital status
                        </div>

                        <div>
                            <select onChange={(e) => { setMaritalStatus(e.target.value) }} className='marital-status' name="cars" id="cars">
                                <option value=""></option>
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                                <option value="Open Marriage">Open Marriage</option>
                            </select>
                        </div>
                        <div className='input-support-text'>
                            Country
                        </div>

                        <div>
                            <select onChange={(e) => { setCountry(e.target.value) }} className='marital-status' name="cars" id="cars">
                                <option value=""></option>
                                {countries.map((item, index) => {
                                    return (<option value={item.isoCode}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className='input-support-text'>
                            Place of residence
                        </div>
                        <div>
                            <select onChange={(e) => { setCity(e.target.value) }} className='marital-status' name="cars" id="cars">
                                <option value=""></option>
                                {states?.map((item, index) => {
                                    return (<option value={item.isoCode}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className='input-support-text'>Language Preferences</div>
                        <div>
                            <div style={{ display: 'flex' }}>
                                <div> <select onChange={(e) => { setLanguagePreference1(e.target.value) }} className='marital-status' name="cars" id="cars">
                                    <option value=""></option>
                                    {Languages.map((item, index) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })}
                                </select></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div> <select onChange={(e) => setLanguagePreference2(e.target.value)} className='marital-status' name="cars" id="cars">
                                <option value=""></option>
                                {Languages.map((item, index) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>
                                    )
                                })}
                            </select></div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div><select onChange={(e) => { setLanguagePreference3(e.target.value) }} className='marital-status' name="cars" id="cars">
                                <option value=""></option>
                                {Languages.map((item, index) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>
                                    )
                                })}
                            </select>
                            </div>
                        </div>
                        <div className='input-support-text'>Your bio</div>
                        <div>
                            <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                onChange={(e) => { setBio(e.target.value) }}
                                sx={{
                                    width: '100%', height: '172px', "& .MuiOutlinedInput-root": {
                                        "& > fieldset": {
                                            border: "none"
                                        }
                                    }
                                }}
                            /></div>
                    </div>
                </div>
                <div className='error'>{personaldetailsError}</div>
                <div class="button-wrap">
                    {/* <Button onClick={handleKnowBetter} variant='contained' style={{ width: '300px', color: 'white', backgroundColor: '#C387C3', borderRadius: '12px', marginTop: '10px', boxShadow: 'none' }}>skip</Button> */}
                    <Button onClick={handleKnowBetter} variant='contained' style={{ width: '300px', color: 'white', backgroundColor: '#C387C3', borderRadius: '12px', marginTop: '10px', marginBottom: '10px', boxShadow: 'none' }}>proceed</Button>
                </div>
            </div>
            <div className='knowbetter-container'>
            </div>
        </div>
    )
}

export default Knowbetter