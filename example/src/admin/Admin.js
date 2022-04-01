import React from 'react'
import { Button, Input } from '@mui/material'
import axios from 'axios'
import "./Admin.css"
import "../config"
import { adminUrl, adminUrlAdd } from '../config'

export default function Admin() {
  const [numbers,setNumber]= React.useState(null);
  const onchangeNumber = (event) => {
    setNumber(event.target.value);
  }
  const  onAdd=async () => {
    if(numbers){
      let numbersArray = numbers.split(",");
    axios.post(adminUrlAdd, {numbers:numbersArray})
    // .then(response => element.innerHTML = response.data.id);
  }

  }

  return (
    <div class="Admin-input">
      <div>
      <Input type="text" name="number" onChange={e=>onchangeNumber(e)}/>
      </div>
      <div>
        <Button onClick={()=>onAdd()}>Add</Button>
      </div>
    </div>
  )
}
