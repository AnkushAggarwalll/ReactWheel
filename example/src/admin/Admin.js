import React ,{useEffect}from 'react'
import { Button, Input } from '@mui/material'
import axios from 'axios'
import "./Admin.css"
import "../config"
import { adminUrl, adminUrlAdd } from '../config'
import WheelComponent from 'react-wheel-of-prizes'
import { adminUrlList ,adminUrlAddWinner, verifyToken} from '../config'
import Login from './Login/Login'

export default function Admin() {
  const [segments,setSegments] = React.useState([])
  const [isWinner,setisWinner] = React.useState(null)
  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
  // const [isStarted,setisStarted] = React.useState(false)
  const [id,setId] = React.useState(null);
  const [isLoading,setLoad] =React.useState(false)
  const segColors = [
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  let token = localStorage.getItem("token");
  useEffect (async() => {
    if(token!=undefined){
      axios.post(verifyToken,{},{
        headers: {
          'authtoken': `${token}` 
        }
      }).then(res => {
        if(res.data.message == "ok")
        setIsLoggedIn(true)
      })
    }
    await axios.get(adminUrlList).then(response => {
      let temp =[];
      response.data.nums.forEach(element => {
        temp.push(element.toString())
      });
      setisWinner(response.data.winner==undefined?null:temp.indexOf(response.data.winner.toString()))
      setSegments(temp);
      setId(response.data.id);
      setLoad(true);
      console.log([1,2,3,4,5])
    })
  },[])

  const onFinished = (winner) => {
    axios.post(adminUrlAddWinner, {winner:winner,id:id},{headers:{'authtoken':token}})
  }
  const [numbers,setNumber]= React.useState(null);
  const onchangeNumber = (event) => {
    setNumber(event.target.value);
  }
  const  onAdd=async () => {
    if(numbers){
      let numbersArray = numbers.split(",");
    axios.post(adminUrlAdd, {numbers:numbersArray},{headers:{'authtoken':token}})
    // .then(response => element.innerHTML = response.data.id);
  }

  }

  return (<>
  {isLoggedIn?
    isLoading?isWinner!=null?<><WheelComponent
      segments={segments}
      segColors={segColors}
      winningSegment={segments[isWinner]}
      onFinished={(winner) => onFinished(winner)}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin'
      isOnlyOnce={true}
      size={290}
      upDuration={100}
      downDuration={1000}
      isStartedCustom={true}
    />
    <div class="Admin-input">
    <div>
    <Input type="text" name="number" onChange={e=>onchangeNumber(e)}/>
    </div>
    <div>
      <Button onClick={()=>onAdd()}>Add</Button>
    </div>
  </div></>:<><WheelComponent
      segments={segments}
      segColors={segColors}
      winningSegment={segments[Math.floor(Math.random()*5)]}
      onFinished={(winner) => onFinished(winner)}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin'
      isOnlyOnce={true}
      size={290}
      upDuration={100}
      downDuration={1000}
      isStartedCustom={false}
      />
      <div class="Admin-input">
    <div>
    <Input type="text" name="number" onChange={e=>onchangeNumber(e)}/>
    </div>
    <div>
      <Button onClick={()=>onAdd()}>Add</Button>
    </div>
  </div></>:<h1>Loading</h1>: <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
  
  
  </>
  )
}
