import React from 'react'
import '../styles/movies.css'

function MovieCard({data,cardStyle,imageUrl,height,radius}) {
    const imageBaseUrl=process.env.REACT_APP_BASE_IMAGE_URL

const imageStyle = {
    backgroundImage: `url("${imageBaseUrl}/${imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: height,
    width: '200px',
    borderRadius: radius,
    position: 'relative'
}


    return (
        <div className={cardStyle}>
            <div style={imageStyle}>
                <div className='movie-info-top'>

                </div>
                <div className='movie-info-bottom'>
                    <p>{data?.title}</p>
                    <p>Rating:</p>
                </div>
            </div>
            {
                cardStyle==='top-rated-card'
                ? <p>{data?.title}</p>
                : null
            }
        </div>
    )
}

export default MovieCard