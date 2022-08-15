import "../styles/AnimeCard.css";

const AnimeCard = (props) => {
 // Anime individual Cards
 const anime = props.anime;
 const imgSrc = anime.images.webp.large_image_url;

 const addToMyList = (e) => {
  e.stopPropagation();
  // adds/remove anime from user myList
  const mal_id = anime.mal_id;
  const title = anime.title;
  const img_url = anime.images.webp.large_image_url;
  if (exist < 0) {
    (props.adjustMyList([{
      "mal_id" : mal_id, 
      "title" : title, 
      "img_url" : img_url
    }], "add to myList"));
  } else {
    props.adjustMyList(anime.mal_id, "remove from myList")
  };
 };

 const exist = props.myList.findIndex(list => list.mal_id === anime.mal_id)
 const adjustBtn = (exist < 0)
  ? <button className="anime-card-btn orange-hover" onClick={addToMyList}>+</button>
  : <button className="anime-card-btn" onClick={addToMyList}>x</button>

 return (
  <>
  <div className="anime-cont card-body" onClick={() => props.openAnime(anime.mal_id)}>
   <figure className="card-fig">
    <img className="card-image" src={imgSrc} alt="Anime pic" />
   </figure>
   <div className="anime-details">
    <h3 className="card-title">{anime.title}</h3>
    <p>score: {anime.score}</p>
    <p>type: {anime.type}</p>
    <p>episodes: {anime.episodes}</p>
    <p>duration: {anime.duration}</p>
   </div>
   {adjustBtn}
  </div>
  </>
 );
} 

export default AnimeCard;
