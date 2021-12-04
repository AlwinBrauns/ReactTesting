import React from 'react';
import { useGesture } from '@use-gesture/react';
import { useState } from 'react';
import { useEffect } from 'react';
import "./LoopSlider.scss"

const Loopslider = () => {
    const [position, setPosition] = useState(3)

    const bind = useGesture(
        {
        onDrag: (
            ({swipe: [swipeX]}) =>
            {
                if(swipeX!==0)
                move(swipeX*-1)
            }
        )
        }
    )

    useEffect(() => {
        setTransition(true);
    }, [position]);

    const handleTransitionEnd = ()=>{
        if(position===0 && transition){
        setTransition(false);
        setPosition(array.length-3-3)
        }
        if(position===array.length-3 && transition){
        setTransition(false);
        setPosition(3)
        }
    }

    const move = (direction)=>{
        setPosition(prevState=>(prevState+direction>0)?(prevState+direction<array.length-3)?prevState+direction:array.length-3:0)
    }

    const [array] = useState([5,6,7,0,1,2,3,4,5,6,7,0,1,2])
    const [transition, setTransition] = useState(true);

    return (
        <div className="Slider" {...bind()} >
            <div className="arrow right" onClick={_=>move(+1)}>Right</div>
            <div className="arrow left" onClick={_=>move(-1)}>Left</div>
            {
            array.map((element, index)=>
                <div
                    className="Slider-Element" 
                    key={index}
                    onTransitionEnd={_=>handleTransitionEnd()}
                    style={{transform: `translateX(-${100*position}%) ${index===position+1?"scale(1.3)":"scale(1.0)"}`, transition: transition?"all 0.44s ease-in-out":"none"}}
                >
                    <div className="Slider-Element-Content">{element}</div>
                </div>
            )
            }
      </div>
    );
}

export default Loopslider;
