import './App.scss';
import {animated, useSpring} from 'react-spring'
import LoopSlider from './Components/LoopSlider/LoopSlider';

function App() {

  const gravity = 9.81;
  let blocked = false;

  const [{scale, x,y}, api]= useSpring({
    from: {
    x: window.innerWidth,
    y: window.innerHeight,
    scale: 1.0
    
  },}, []);
  
  const handleClick = (event) => {
    let goal = {x: Math.random()*window.innerWidth/1.5, y: 0  }
    api.start(
      {
        from: {
          x: window.innerWidth,
          y: window.innerHeight,
          scale: 0

        },
        to: {
          x: goal.x,
          y: goal.y,
          scale: 1.5
        },
        config: {
          mass: 1, tension: 400, friction: 100
        }
      }
    )
    if(!blocked)
    {
      blocked = true;
      let currentTime = 0.0;
      let stepsInMs = 25;
      let amountOfSteps = 50;
      let friction = 100;
      let threshold = 400;
      let intervall = setInterval(()=>{
        goal.y+= gravity * currentTime;
        if(goal.y>window.innerHeight-threshold){
          goal.y = window.innerHeight -threshold;
        }
        currentTime += (stepsInMs/1000);
        console.log(currentTime)
        api.start(
          {
            from: {
              x: x.get(),
              y: y.get()
            },
            to: {
              x: goal.x,
              y: goal.y
            },
            config: {
              mass: 1, tension: 400, friction: friction
            }
          }
        );
      }, stepsInMs)
      setTimeout(()=>{
        clearInterval(intervall)
        blocked = false;
      }, stepsInMs*amountOfSteps)
  }
  }
  
  return (
    <div className="App">
      <LoopSlider />
      <LoopSlider />
      <LoopSlider />
      <LoopSlider />
      <LoopSlider />
      <LoopSlider />
      <LoopSlider />
      <div className="Fullsize-Window">
        <div className="Shooter" onClick={event=>{
          if(!blocked)
            handleClick(event)
          }}>Press Me!</div> 
          <animated.div style={{scale, x,y}} className="Ball">🎁</animated.div>
      </div>
    </div>
  );
}

export default App;
