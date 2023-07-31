import React from 'react'

const Play = ({onPlayClick}) => {
  return (
      <svg className="play-pause" viewBox="0 -10 40 80" onClick={onPlayClick}>
        <polygon points="0,0 50,30 0,60" />
      </svg>
  )
}

export default Play