import React from 'react'
import Star from '../StarRating/Star'
import { useState } from 'react'

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'    
}

const starContainerStyle = {
    display: 'flex',
}

const textStyle = {
    lineHeight: '1',
    margin: '0'
}
const StarRating = ( { maxRating = 5} ) => {
    const [rating , setRating] = useState(1)

    const handleClick = (rating) => {
        setRating(rating)
    }

  return (
    <div style={containerStyle}>
        <div style={starContainerStyle}>
            {
                Array.from({length: maxRating}, (_, i) => 
                    <Star key={i} onClick={() => handleClick (i + 1)} full={rating >= i + 1}/>
                )
            }
        </div>
        <p style={textStyle}>{rating || ' '}</p>
    </div>
  )
}

export default StarRating