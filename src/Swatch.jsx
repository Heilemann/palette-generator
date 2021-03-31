import React from 'react'

const Swatch = props => {
  return (
    <div className="swatch" style={{ backgroundColor: props.color }}>{props.color}</div>
  )
}

export default Swatch
