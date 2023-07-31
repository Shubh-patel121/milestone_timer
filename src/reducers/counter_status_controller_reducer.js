const timerReducer = (state, action) => {
  
  switch (action.type) {
    case 'pause':
      return {
        ...state,
        pause: true,
      };
    case 'resume':
      return {
        ...state,
        resume: true,
      };
    case 'middle':
      return {
        ...state,
        halfWayEnd: true,
      };
    case 'red_text':
      return {
        ...state,
        redText: true,
      };
    case 'blink':
      return {
        ...state,
        blink: true,
      };
    case 'clear_pause':
      return {
        ...state,
        pause: false,
      };
    case 'clear_resume':
      return {
        ...state,
        resume: false,
      };
    case 'end':
      return {
        ...state,
        blink: false,
        redText: false,
        status: false,
      };
    default:
      return state;
  }
}

export default timerReducer;
