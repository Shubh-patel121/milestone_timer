import React, { useEffect } from 'react';
import Pause from '../../components/reusable/pause';
import Play from '../../components/reusable/play';
import { timerController } from '../../controllers/counter_controllers';



const CounterStatus = ({ timer, speed, className, setEstimatedDeploymentTime }) => {
  let elapsedSecondCounter = 0;

  const MS = 1000;
  const SECOND = 60;
  const ZERO = 0;
  const TEN = 10;

    const { minutes, seconds, handleCountDown, state, dispatch } = timerController(timer);
  
    const { blink, halfWayEnd, pause, resume, redText, status } = state;
  
    useEffect(() => {
      // creates the loop based on minutes:seconds
      let everySecond = setInterval(() => handleCountDown(), MS / speed);

      let remainingSeconds = minutes * SECOND + seconds;
      let elapsedSecond = timer*SECOND - remainingSeconds;
      elapsedSecondCounter = (timer*SECOND - elapsedSecond) / speed;

      if(pause || speed ){
        setEstimatedDeploymentTime(elapsedSecondCounter);
      }

      if (minutes === ZERO) {
        if (seconds === 20) {
          dispatch({ type: 'red_text' });
        }
        if (seconds === TEN) {
          dispatch({ type: 'blink' });
        }
      }
  
      if (pause) {
        clearInterval(everySecond);
      }
  
      if (resume) {
        dispatch({ type: 'clear_pause' });
        everySecond = setInterval(() => handleCountDown(), MS / speed);
        dispatch({ type: 'clear_resume' });
      }
  
      if (seconds === ZERO && minutes === ZERO) {
        dispatch({ type: 'end' });
        clearInterval(everySecond);
      }
  
      // clear the setInterval to avoid memory leaks
      return function cleanup(){
        clearInterval(everySecond);
      };
    }, [dispatch, handleCountDown, minutes, pause, resume, seconds, speed]);
  
    return (
     <div>
     <div className="times-alerts">
     <div className="timer_updates">
      {halfWayEnd && (
        <p className="halfWayEnd">
          {status ? 'More than half way there!' : "Time's Up!"}
        </p>
      )}
      </div>
     </div>
     <div className="counter_container">
     <div className="counter_col">
     <div className={ blink ? 'blinking-text blink timer_class' : redText ? "blink timer_class" : "timer_class"}>
      {`${minutes < TEN ? `${ZERO}${minutes}` : minutes}:${
        seconds < TEN ? `${ZERO}${seconds}` : seconds
      }`}
      </div>
     </div>
     <div className="play-pause-conatainer">
      {!pause ? (
        <Pause onPauseClick={() => dispatch({ type: 'pause' })} />
      ) : (
        <Play
        onPlayClick={() => dispatch({ type: 'resume' })}
        />
      )}
      </div>
     </div>
     </div> 
   )
  };
  
  export default CounterStatus;