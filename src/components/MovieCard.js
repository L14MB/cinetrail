import React,{useState} from 'react'
import '../styles/movies.css'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function MovieCard({data,cardStyle,imageUrl,height,radius}) {
    const imageBaseUrl=process.env.REACT_APP_IMAGE_BASE_URL
    const [rating,setRating] = useState(data?.vote_average/2)

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
        <Link to={`/moviedetails/${data?.id}`} className={cardStyle}>
            <div style={imageStyle}>
                <div className='movie-info-top'>
                    <Rating movieRating={rating}/>
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
        </Link>
    )
}

export default MovieCard