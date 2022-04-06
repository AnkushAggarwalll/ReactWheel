import React ,{useEffect}from 'react'
import './index.css'
import axios from 'axios'
import WheelComponent from 'react-wheel-of-prizes'
import { adminUrlList ,adminUrlAddWinner, verifyToken} from './config'




const App = () => {
  const [segments,setSegments] = React.useState([])
  const [isLoading,setLoad] =React.useState(false)
  const segColors = [
                    '#3DA5E0',
                    '#34A24F',
                    '#F9AA1F',
                    '#EC3F3F',
                    '#FF9000'
                    ]
  const [isWinner,setisWinner] = React.useState(null)
  useEffect (async() => {
    await axios.get(adminUrlList).then(response => {
      console.log(response)
      let temp =[];
      response.data.nums.forEach(element => {
        temp.push(element.toString())
      });
      setisWinner(response.data.winner==undefined?null:temp.indexOf(response.data.winner.toString()))
      setSegments(temp);
      setLoad(true);
    })
  },[])
  return (
    <React.Fragment>
      {isLoading?isWinner!=null?<WheelComponent
      segments={segments}
      segColors={segColors}
      winningSegment={segments[isWinner]}
      onFinished = {()=>console.log("finished")}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin'
      isOnlyOnce={true}
      size={290}
      upDuration={100}
      downDuration={1000}
      isStartedCustom={true}
    />:<>
    <div className="userText">
        Result is Not declared yet please comeback Later !!!
    </div>
    <WheelComponent
      segments={segments}
      segColors={segColors}
      onFinished = {()=>console.log("finished")}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin'
      isOnlyOnce={true}
      size={290}
      upDuration={100}
      downDuration={10000000000000000000000000000000000000000000000000}
      isStartedCustom={true}
      />
    </>
      :<h1>loading</h1>}
    </React.Fragment>
  )
}

export default App
