import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import line from "../../assets/images/line.svg"

function EmailInput() {
  return (
    <div>
      <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
        id="outlined-basic"
        variant="outlined"
        size='small'
        sx={{
          width: '300px', "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              border: "none"
            }
          }
        }}
        InputProps={{
          endAdornment:
            <InputAdornment style={{ paddingLeft: '2px' }} position="start">
              <img style={{ paddingRight: '8px' }} src={line} alt='separator' />
              <span style={{ position: 'relative', left: '4px', color: '#525252', fontSize: '12px', fontWeight: '400' }}>send OTP</span>
            </InputAdornment>,
        }} />
    </div>

  )
}

export default EmailInput
