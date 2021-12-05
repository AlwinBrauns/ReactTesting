import './App.scss';
import {animated, useSpring} from 'react-spring'
import LoopSlider from './Components/LoopSlider/LoopSlider';

function App() {

  const gravity = 9.81;
  let blocked = false;
  const startingY = window.innerHeight + 100;
  const startingX = window.innerWidth + 100;

  const [{scale, x,y}, api]= useSpring({
    from: {
    x: startingX,
    y: startingY,
    scale: 1.0
    
  },}, []);
  
  const handleClick = (event) => {
    let goal = {x: Math.random()*window.innerWidth/1.5, y: Math.random()*100  }
    api.start(
      {
        from: {
          x: startingX,
          y: startingY,
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
      let amountOfSteps = 70;
      let friction = 80;
      let threshold = 50;
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
        <div className="Water"></div>
      </div>
    </div>
  );
}

export default App;
