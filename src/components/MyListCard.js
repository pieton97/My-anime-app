import React from "react";

function MyListCard(props) {
 // refactor for easy access
 const anime = props.anime;
 const removeAnime = (e) => {
  e.stopPropagation();
  console.log(anime.mal_id);
  props.adjustMyList(anime.mal_id, "remove from myList")
 }

 return (
  <>
   <div className="anime-cont card-body" onClick={() => props.openAnime(anime.mal_id)}>
    <figure className="card-fig">
      <img className="card-image" src={anime.img_url} alt="Anime pic" />
    </figure>
    <div className="anime-details">
      <h3 className="card-title">{anime.title}</h3>
    </div>
    <button className="anime-card-btn" onClick={removeAnime}>x</button>
   </div>
  </>
 );
}

export default MyListCard;
