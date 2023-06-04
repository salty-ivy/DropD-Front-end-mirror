import React, { useState, useEffect } from 'react'
import logo from "../../assets/images/dropdsmall.svg"
import Selectinterest from './interestSelect/selectinterest'
import Email from './email/email'
import Name from './name/name'
import Gender from './gender/gender'
import Genderpreferences from './genderpreferences/genderpreferences'
import Uploadphoto from './Uploadphoto/uploadphoto'
import leftarrow from "../../assets/images/leftarrow.svg"
import Attributes from './attributes/attributes'
import Partnerattributes from './partnerattributes/partnerattributes'
import Zone from './zone/zone'
import Knowbetter from './knowbetter/knowbetter'
import CreateProfile from '../create/createProfile'
import { UPDATE_PROFILE } from '../../axios/POST_API'
import Success from './success/success'
import { useHistory } from 'react-router-dom'
import { GET_INTERESTS } from '../../axios/GET_API'
import Userdetailsnav from '../../components/UserDetailsNav/userdetailsnav'
import ConnectWalletDropd from '../connectwallet/components/connectwalletmain'
import ConnectedWallet from '../connectwallet/components/walletconnected'
import SubscriptionWallet from '../connectwallet/components/walletsubscription'
import ConnectWalletSuccess from '../connectwallet/components/walletsuccess'
import { useParams } from 'react-router-dom'

function UserDetails() {

    const history = useHistory()
    const {page} = useParams()
    const [interests, setInterests] = useState([])
    const [imageFiles, setImagefiles] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [genderpreference, setGenderPreference] = useState()
    const [personkundliattributes, setPersonkundliAttributes] = useState([])
    const [partnerkundliattributes, setPartnerkundliattributes] = useState([])
    const [zone, setZone] = useState()


    const getInterests = async () => {
        const response = await GET_INTERESTS()
        setInterests(response)
    }

    useEffect(() => {
        let item = localStorage.getItem('token')
        if (!item) {
            history.push("/login")
        }
    }, [])



    const handleProfileUpdate = () => {
        UPDATE_PROFILE({ age: "25", genderpreference: genderpreference, gender: gender, personkundliattributes: personkundliattributes, partnerkundliattributes: partnerkundliattributes, zone: zone, interests: interests })
    }
    // useEffect(() => {
    //     getInterests()
    // }, [])

    const [sliderPage, setSliderPage] = useState()

    useEffect(() => {
        if( page ){
            setSliderPage(page)
        }else{
            setSliderPage("email");
        }
    }, []);

    const renderSlider = () => {
        switch (sliderPage) {
            case "email":
                return (
                    <Email
                        setSliderPage={setSliderPage}
                    />
                );
            case "interests":
                return (
                    <Selectinterest
                        setSliderPage={setSliderPage}
                        setInterests={setInterests}
                        interests={interests}
                    />
                );
            case "profile_pics":
                return (
                    <Uploadphoto
                        setSliderPage={setSliderPage}
                        setImagefiles={setImagefiles}
                    />
                );
            case "nick_name":
                return (
                    <Name
                        setSliderPage={setSliderPage}
                    />
                )
            case "gender":
                return (
                    <Gender
                        setSliderPage={setSliderPage}
                        setGender={setGender}
                    />
                )
            case "gender_preference":
                return (
                    <Genderpreferences
                        setSliderPage={setSliderPage}
                        setGenderPreference={setGenderPreference}
                    />
                );
            case "person_kundli_attributes":
                return (
                    <Attributes
                        setSliderPage={setSliderPage}
                        setPersonkundliAttributes={setPersonkundliAttributes}
                        personkundliattributes={personkundliattributes}
                    />
                )
            case "partner_kundli_attributes":
                return (
                    <Partnerattributes
                        setSliderPage={setSliderPage}
                        setPartnerkundliattributes={setPartnerkundliattributes}
                        partnerkundliattributes={partnerkundliattributes}
                    />
                );
            case "zone":
                return (
                    <Zone
                        setSliderPage={setSliderPage}
                        setZone={setZone}
                    />
                );
            case "knowbetter":
                return (
                    <Knowbetter
                        setSliderPage={setSliderPage}
                        handleProfileUpdate={handleProfileUpdate}
                    />
                );
            case "walletconnect":
                return (
                    <ConnectWalletDropd
                        setSliderPage={setSliderPage}
                    />
                );
            case "connectedwallet":
                return (
                    <ConnectedWallet
                        setSliderPage={setSliderPage}
                    />
                );
            case "subscription":
                return (
                    <SubscriptionWallet
                        setSliderPage={setSliderPage}
                    />
                );
                case "walletsuccess":
                    return (
                        <ConnectWalletSuccess
                            setSliderPage={setSliderPage}
                        />
                    );
            case "success":
                return (
                    <Success
                        setSliderPage={setSliderPage}
                    />
                );

            default:
                return "foo";
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            {/* <div className='navbar-wrapper'>
                <div style={{ position: 'relative', top: '20px', left: '15px' }}><img src={leftarrow} alt="back" /></div>
                <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '30px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
            </div> */}
            {/* <Userdetailsnav/> */}
            {renderSlider()}
        </div>
    )
}

export default UserDetails