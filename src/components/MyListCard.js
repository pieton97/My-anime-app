import React from "react";

function MyListCard(props) {
 // refactor for easy access
 const anime = props.anime;

 return (
  <>
   <div className="anime-cont card-body" onClick={() => props.openAnime(anime.mal_id)}>
    <figure className="card-fig">
      <img className="card-image" src={anime.img_url} alt="Anime pic" />
    </figure>
    <h3 className="card-title">{anime.title}</h3>
   </div>
  </>
 );
}

export default MyListCard;
