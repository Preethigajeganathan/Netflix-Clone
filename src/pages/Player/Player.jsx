import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at: "",
    type: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmZiOWVkZWVkZjdlZDFjZWRlM2M3MWNhYzVjYmJjNyIsIm5iZiI6MTc4OTc2MjU0Mi44NSwic3ViIjoiNmFhZDliZWVkNGNlMjU4NTAxY2YyOTg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ADWx7uJXX4MZzNtrOJu8eve3N2pJNvXNmBt5dPG3OEI'
  }
};

useEffect(()=>{
   if (id === 'home-trailer') {
    setApiData({
      name: "The Protector | Official Trailer [HD] | Netflix",
      key: "80dqOwAOhbo",
      published_at: "",
      type: "Trailer"
    });
    return;
  }

fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back-arrow" onClick={()=>{navigate(-1)}} />
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`} title='Trailer' frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player