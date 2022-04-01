import React ,{useEffect}from 'react'
import axios from 'axios'
import WheelComponent from 'react-wheel-of-prizes'
import Admin from './admin/Admin'
import './index.css'
import { adminUrlList ,adminUrlAddWinner} from './config'

const App = () => {
  const [segments,setSegments] = React.useState([])
  // const [isStarted,setisStarted] = React.useState(false)
  let isWinner =3;
  const [id,setId] = React.useState(null);
  const [isLoading,setLoad] =React.useState(false)
  const segColors = [
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  useEffect (async() => {
    console.log("in useefect")
    await axios.get(adminUrlList).then(response => {
      let temp =[];
      response.data.nums.forEach(element => {
        temp.push(element.toString())
        
      });
      setSegments(temp);
      setId(response.data.id);
      setLoad(true);
      console.log([1,2,3,4,5])
    })
  },[])

  const onFinished = (winner) => {
    axios.post(adminUrlAddWinner, {winner:winner,id:id})
  }
  return (
    <React.Fragment>
      {segments[isWinner]}
      {isLoading?isWinner?<><WheelComponent
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
      /><p>winner</p></>:<WheelComponent
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
        />:<h1>Loading</h1>}
      <Admin/>
    </React.Fragment>
  )
}

export default App
