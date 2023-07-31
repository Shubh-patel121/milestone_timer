import React from 'react'

const Pause = ({onPauseClick}) => {
  return (
    <svg className="play-pause" viewBox="0 -10 40 80" onClick={onPauseClick}>
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  )
}

export default Pause