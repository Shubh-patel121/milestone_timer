const  controlReducer = (state, action) => {
  switch (action?.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'start': {
      return {
        ...state,
        error: false,
        disabled: true,
        startTimer: true,
      };
    }
    case 'restart': {
      return {
        ...state,
        timerSpeed: 1.0,
        disabled: false,
        startTimer: false,
        inputValue: '',
        error: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: true,
        inputValue: '',
      };
    }
    default:
      return state;
  }
}

export default controlReducer;
