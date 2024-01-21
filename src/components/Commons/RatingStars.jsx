import React, { useEffect, useState } from 'react'
import { TiStarFullOutline , TiStarHalfOutline , TiStarOutline } from "react-icons/ti";

// change the default input of reviewCount
const RatingStars = ({reviewCount = 4.5, size}) => {

    const [starCount,setStarCount] = useState({fullStar:0,halfStar:0,emptyStar:0});

    useEffect(() => {
        const fullStars = Math.floor(reviewCount) || 0;
        setStarCount({fullStar:fullStars, halfStar:Number.isInteger(reviewCount)?0:1, emptyStar:Number.isInteger(reviewCount) ? 5-fullStars : 4 - fullStars});
    },[reviewCount]);

  return (
    <div className='flex gap-[0.25rem] text-yellow-100'>
        {[... new Array(starCount.fullStar)].map((_,index) => (
            <TiStarFullOutline key={index} size={size || 20} />
        ))}
        {[... new Array(starCount.halfStar)].map((_,index) => (
            <TiStarHalfOutline key={index} size={size || 20} />
        ))}
        {[... new Array(starCount.emptyStar)].map((_,index) => (
            <TiStarOutline key={index} size={size || 20} />
        ))}
    </div>
  )
}

export default RatingStars