import React from 'react'
import { Button } from '@mui/material'

function CustomButton(props) {
  return (
    <Button 
    id="cursor"
    {...props}
    variant='contained' 
    style={{width:'100%',
    backgroundColor:'#C387C3',
    borderRadius:'19px',
    boxShadow:'none'
    }}>{props.children}</Button>
  )
}

export default CustomButton