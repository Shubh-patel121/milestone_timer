import { useState, useCallback, useReducer } from 'react';
import timerReducer from '../reducers/counter_status_controller_reducer';

const initialState = {
    status: true,
    redText: false,
    blink: false,
    pause: false,
    resume: false,
    halfWayEnd: false,
  };
  
  export const timerController = (timer) => {
    const [minutes, setMinutes] = useState(timer);
    const [seconds, setSeconds] = useState(0);
  
    const [state, dispatch] = useReducer(timerReducer, initialState);
  
    const handleHalfWay = useCallback(() => {
      // if number / 2 === float number it means that is odd
      const halfMinute = timer / 2;
      const odd = halfMinute.toString().match(/^\d{1,2}\.\d/);
  
      // if the number is even
      if (!odd && minutes === halfMinute && seconds === 1) {
        dispatch({ type: 'middle' });
      }
  
      // if the number is odd
      if (odd && minutes === Math.floor(halfMinute) && seconds === 31) {
        dispatch({ type: 'middle' });
      }
    }, [minutes, seconds, timer]);
  
    const handleCountDown = useCallback(() => {
      // decreases one second if seconds > 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
  
      // see if is on halfway;
      handleHalfWay();
  
      // if sec equal to 0 and minutes > 0 then keep doing the logic
      if (seconds === 0) {
        if (minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, [handleHalfWay, minutes, seconds]);
  
    return { state, dispatch, minutes, seconds, handleCountDown };
  };
  