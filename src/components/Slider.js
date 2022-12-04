import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { MdKeyboardArrowRight,MdKeyboardArrowLeft } from 'react-icons/md'
import '../styles/slider.css'

function Slider({apiKey,baseUrl}) {
const [upcomingMovies,setUpcomingMovies] = useState([])
const [index,setIndex] = useState(0)
const imageBaseUrl=process.env.REACT_APP_IMAGE_BASE_URL


    useEffect(() => {
        axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
        .then(res=>{
            setUpcomingMovies(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [])

    const sliderStyle={
        backgroundImage:`url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height:'60vh',
        position:'relative'
    }

const handleRight=()=>{
    setIndex(index+1)

    if(index===upcomingMovies.length-1){
        setIndex(0)
    }
}

const handleLeft=()=>{
    setIndex(index-1)

    if(index===0) {
        setIndex(upcomingMovies.length-1)
    }
}



    return (
        <div style={sliderStyle}>
            <div className='slider-overlay'></div>
            <MdKeyboardArrowRight onClick={handleRight} className='right-arrow'/>
            <MdKeyboardArrowLeft onClick={handleLeft} className='left-arrow'/>
            <div className='slider-info'>
                <h1>{upcomingMovies[index]?.title}</h1>
                <p className='slider-description'>{upcomingMovies[index]?.overview.slice(0,130)}...</p>
                <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            </div>
        </div>
    )
}

export default Slider