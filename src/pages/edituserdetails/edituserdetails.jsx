import React, { useState, useEffect } from 'react'
import logo from "../../assets/images/dropdsmall.svg"
import IndexPage from './index/index'
import Selectinterest from './interestSelect/selectinterest'
import EditDatingProfile from './editdatingprofile/editdatingprofile'
import Gender from './gender/gender'
import Genderpreferences from './genderpreferences/genderpreferences'
import leftarrow from "../../assets/images/leftarrow.svg"
import Attributes from './attributes/attributes'
import Partnerattributes from './partnerattributes/partnerattributes'
import Zone from './zone/zone'
import Knowbetter from './knowbetter/knowbetter'
import CreateProfile from '../create/createProfile'
import { UPDATE_PROFILE } from '../../axios/POST_API'
import { useHistory } from 'react-router-dom'
import { GET_INTERESTS } from '../../axios/GET_API'
import { USER_VIEW_PROFILE } from '../../axios/GET_API'
import Userdetailsnav from '../../components/UserDetailsNav/userdetailsnav'
import { wait } from '@testing-library/user-event/dist/utils'

function EditUserDetails() {
   
    const history = useHistory()
    const [interests, setInterests] = useState([])
    const [imageFiles, setImagefiles] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [profileImages,setProfileImages] = useState()
    const [profileData,setProfileData] = useState()
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

  

    const viewUserProfile = async() => {
        try{
            const response = await USER_VIEW_PROFILE()
            setProfileData(response?.data)
        }catch(error){
            console.log(error,"error in profile  data in edit user details")
        }
    }


    useEffect(() => {
        viewUserProfile()
        // getUserDetails()
        console.log(profileData, "Profile Data line 66")
      }, [])

    const handleProfileUpdate = () => {
        UPDATE_PROFILE({ age: "25", genderpreference: genderpreference, gender: gender, personkundliattributes: personkundliattributes, partnerkundliattributes: partnerkundliattributes, zone: zone, interests: interests })
    }
    useEffect(() => {
        getInterests()
    }, [])

    const [sliderPage, setSliderPage] = useState()

    useEffect(() => {
        setSliderPage("index");
    }, []);

    const renderSlider = () => {
        switch (sliderPage) {
            case "index":
                return (
                    <IndexPage
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                    />
                );
            case "selectinterest":
                return (
                    <Selectinterest
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                        setInterests={setInterests}
                        interests={interests}
                    />
                );
            case "editdatingprofile":
                return (
                    <EditDatingProfile
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                        setInterests={setInterests}
                        interests={interests}
                    />
                );
            case "gender":
                return (
                    <Gender
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                        setGender={setGender}
                    />
                )
            case "genderpreferences":
                return (
                    <Genderpreferences
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                        setGenderPreference={setGenderPreference}
                    />
                );
            case "attributes":
                return (
                    <Attributes
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                        setPersonkundliAttributes={setPersonkundliAttributes}
                        personkundliattributes={personkundliattributes}
                    />
                )
            case "partnerattributes":
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
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                        setZone={setZone}
                    />
                );
            case "knowbetter":
                return (
                    <Knowbetter
                        profileData={profileData}
                        setSliderPage={setSliderPage}
                        handleProfileUpdate={handleProfileUpdate}
                    />
                );
            default:
                return "foo";
        }
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column',}}>
            {/* <div className='navbar-wrapper'>
                <div style={{ position: 'relative', top: '20px', left: '15px' }}><img src={leftarrow} alt="back" /></div>
                <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '30px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
            </div> */}
            {/* <Userdetailsnav/> */}
            {renderSlider()}
        </div>
    )
}

export default EditUserDetails