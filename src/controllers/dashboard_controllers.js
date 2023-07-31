import { useReducer} from 'react';
import controlReducer from '../reducers/dashboard_controller_reducer';

const initialState = {
    inputValue: '',
    timerSpeed: 1.0,
    disabled: false,
    startTimer: false,
    error: false,
  };
  
  export const dashboardController = () => {
    const [state, dispatch] = useReducer(controlReducer, initialState);
    return { state, dispatch };
  };