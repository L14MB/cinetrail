import React,{useContext,useEffect,useState} from 'react'
import '../styles/movies.css'
import { ThemeContext } from '../contexts/ThemeContext'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Review from '../components/Review'
import Rating from '../components/Rating'

function MovieDetails({apiKey,baseUrl}) {
    const {darkMode,setDarkMode} = useContext(ThemeContext)
    const [movie,setMovie] = useState({})
    const {movieid} = useParams()
    const [videoLink,setVideoLink] = useState({})
    const [reviews,setReviews] = useState([])
    const [reviewNumber,setReviewNumber] = useState(3)
    const [totalReviews,setTotalReviews] = useState(0)
    const [movieRating,setMovieRating] = useState(0)
    const imageBase = process.env.REACT_APP_IMAGE_BASE_URL

    useEffect(() => {
        axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
        .then(res=>{
            setMovieRating(res.data.vote_average)
            setMovie(res.data)
        })
        .catch(err=>console.log(err))

        axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}`)
        .then(res=>{
            const youtubeLink = res.data.results.filter(item=>item.site==="YouTube" && item.type==="Trailer")
            setVideoLink(youtubeLink[0].key)
        })
        .catch(err=>console.log(err))

        axios.get(`${baseUrl}/movie/${movieid}/reviews?api_key=${apiKey}`)
        .then(res=>{
            setTotalReviews(res.data.total_results)
            setReviews(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [])

    return(
        <div className={darkMode ? 'movie-details-container' : 'movie-details-container details-light'}>
            {
                videoLink
                ?   <div className='trailer-container'>
                    <ReactPlayer
                        className='trailer-player'
                        url={`https://www.youtube.com/watch?v=${videoLink}`}
                        width='100%'
                        height='100%'
                    />
                    </div>
                :   <div className='trailer-container-blank'
                        style={{
                            backgroundImage: `url('${imageBase}/${movie?.backdrop_path}')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    >
                        <p>No trailers released yet.</p>
                    </div>
            }
            <div className={darkMode ? 'details-container' : 'details-container details-light'}>
                <div className='title-container'>
                    <h1>{movie.title}</h1>
                </div>
            <Rating movieRating={movieRating/2}/>
            <div className='info-container'>
                <img src={`${imageBase}/${movie?.poster_path}`} className='details-poster'/>
                <div className='movie-info'>
                    <h2>{movie?.tagline}</h2>
                    <h4>{movie?.overview}</h4>
                    <h4>Status: <span>{movie?.status}</span></h4>
                    <h4>Runtime: <span>{movie?.runtime} min.</span></h4>
                    <h4>Budget: <span>{movie?.budget}</span></h4>
                </div>
            </div>
            <div className='review-container'>
                <p className='reviews-title'>Reviews</p>
                {
                    reviews?.slice(0,reviewNumber).map(item=>{
                        return <Review key={item.id} review={item}/>
                    })
                }

                {
                    reviewNumber>=totalReviews
                    ? <p className='review-number' onClick={()=>setReviewNumber(3)}>End of reviews</p>
                    : <p className='review-number' onClick={()=>setReviewNumber(reviewNumber+3)}>Read More Reviews</p>
                }
            </div>

        </div> 
       </div> 
    )
}

export default MovieDetails