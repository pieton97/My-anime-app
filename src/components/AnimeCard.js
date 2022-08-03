import "../styles/AnimeCard.css";

const AnimeCard = (props) => {
 // Anime Cards
 return (
  <>
  <div className="anime-cont card-body" onClick={() => props.openAnime(props.animeKey)}>
   <figure className="card-fig">
    <img className="card-image" src={props.anime.images.jpg.large_image_url} alt="Anime pic" />
   </figure>
   <div className="anime-details">
    <h3 className="card-title">{props.anime.title}</h3>
    <p>type: {props.anime.type}</p>
    <p>score: {props.anime.score}</p>
    <p>duration: {props.anime.duration}</p>
    <p>rank: {props.anime.rank}</p>
    <p>popularity: {props.anime.popularity}</p>
    <p>members: {props.anime.members}</p>
   </div>
  </div>
  </>
 );
}

export default AnimeCard;
