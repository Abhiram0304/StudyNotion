import React from 'react'
import './HighlightText.css'

const HighlightText = ({text}) => {
  return (
    <span className="font-bold text-gradient">{text}</span>
  )
}

export default HighlightText