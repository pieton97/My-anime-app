import "../styles/AnimeCard.css";

const AnimeCard = (props) => {
 // Anime individual Cards
 const anime = props.anime;
 const imgSrc = anime.images.jpg.large_image_url;

 return (
  <>
  <div className="anime-cont card-body" onClick={() => props.openAnime(anime.mal_id)}>
   <figure className="card-fig">
    <img className="card-image" src={imgSrc} alt="Anime pic" />
   </figure>
   <div className="anime-details">
    <h3 className="card-title">{anime.title}</h3>
    <p>type: {anime.type}</p>
    <p>score: {anime.score}</p>
    <p>duration: {anime.duration}</p>
    <p>rank: {anime.rank}</p>
    <p>popularity: {anime.popularity}</p>
    <p>members: {anime.members}</p>
   </div>
  </div>
  </>
 );
}

export default AnimeCard;
