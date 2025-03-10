import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

const CustomInput = ({name, label, placeholder}) => {
  return (
    <>
        <Label className="text-right" >
            {label}
        </Label>
        <Input id={name} className="col-span-3" placeholder={placeholder} />
    </>
  )
}

export default CustomInput