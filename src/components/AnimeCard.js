import "../styles/AnimeCard.css";

function AnimeCard({ anime }) {
 // Anime Cards
 return (
  <>
  <a className="card-body" href={anime.url} rel="noreferrer nofollow" target="_blank" alt={anime.title}>
   <figure className="card-fig">
    <img className="card-image" src={anime.images.webp.large_image_url} alt="Anime pic" />
   </figure>
   <h3 className="card-title">{anime.title}</h3>
  </a>
  </>
 );
}

export default AnimeCard;
