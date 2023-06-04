import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import InputAdornment from '@mui/material/InputAdornment';
import line from "../../assets/images/line.svg"


function MobileInput({phone,setPhone,handleClick}) {
    const [value, setValue] = useState()
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <PhoneInput
                    country={'in'}
                    value={value}
                    onChange={phone => setValue(phone)}
                    inputStyle={{ border: 'none', width: '210px', boxShadow: 'none', height: '42px', borderRadius: '10px 0px 0px 10px' }}
                    buttonStyle={{backgroundColor:'white',borderRadius:'10px',border:'none'}}
                    dropdownStyle={{borderRadius:'10px'}}
                    InputProps={{
                        endAdornment: <InputAdornment onClick={handleClick} position="start">send otp </InputAdornment>,
                    }}
                />
            </div>
            
        </div>
    )
}

export default MobileInput