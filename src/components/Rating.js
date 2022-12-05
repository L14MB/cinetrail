import React from 'react'
import StarRatings from 'react-star-ratings'

function Rating({movieRating}) {
    return(
        <StarRatings
            rating={movieRating}
            starRatedColor='#e50916'
            numberOfStars={5}
            name='rating'
            starEmptyColor='grey'
            starDimension='15px'
            starSpacing='1px'
        />    
    )
}

export default Rating