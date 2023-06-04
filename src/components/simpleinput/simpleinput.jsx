import React from 'react'
import TextField from '@mui/material/TextField';


function Simpleinput() {
  return (
    <div>
        <TextField style={{ backgroundColor: 'white', borderRadius: '10px', width: '100%' }}
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
        />
    </div>
  )
}

export default Simpleinput