import React, { useState } from "react";
import "../styles/AnimeModal.css"

function AnimeModal({ setOpenModal, clickedAnime }) {
  const [showMore, setShowMore] = useState(false);
  const anime = clickedAnime.data;

  const testFunc = () => {
    console.log('hola aloha');
  }

  // left body
  let genreString = "";
  anime.genres.forEach(genre => {
    genreString += `<span onClick="alert('mouseover')" >${genre.name}, </span>`
  });

  // right body
  const synopsis = anime.synopsis.split(". ").join(". \n\n");

  
 return (
  <div className="modalBackground" onClick={() => setOpenModal(false)}>
   <div className="modalContainer" onClick={e => e.stopPropagation()}>
    <div className="titleCloseBtn">
     <button onClick={() => {setOpenModal(false)}}>X</button>
    </div>
    
    <div className="body">
     <div className="left-body">
      <div className="modal-img-container">
        <img src={anime.images.jpg.large_image_url} alt="Anime pic" />
      </div>
      <div>
        <a className="action-btn" href={anime.url} rel="noreferrer noopener" target="_blank">View source</a>
        <a className="action-btn" href="www.google.com" rel="noreferrer noopener" target="_blank">Watch anime</a>
      </div>
      <div>
        <h3>Alternate Titles</h3>
        <hr></hr>
        <p><strong>{anime.titles[1].type}</strong>: {anime.titles[1].title}</p>
        <p><strong>English</strong>: {anime.title_english}</p>
        <p><strong>Japanese</strong>: {anime.title_japanese}</p>
      </div>
      <div>
        <h3>Information</h3>
        <hr></hr>
        <p>Aired: {anime.aired.string}</p>
        <p>Year: {anime.year} {anime.season}</p>
        <p>Status: {anime.status}</p>
        <p>Episodes: {anime.episodes}</p>
        <p>Duration: {anime.duration}</p>
        <p>Studios: <a href={anime.studios[0].url} rel="noreferrer noopener" target="_blank">{anime.studios[0].name}</a></p>
        <p>Genre: <span dangerouslySetInnerHTML={{__html: genreString}} /></p>
      </div>

     </div>

     <div className="right-body">
      <h3>{anime.title}</h3>
      <p>Score: {anime.score}</p>
      <p>Rank: {anime.rank}</p>
      <p>Members: {anime.members}</p>
      <p>
        {showMore ? synopsis : `${synopsis.substring(0, 250)}...`}
        <button className="show-synopsis" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show less" : "Show more"}
        </button>
      </p>
      
      <p></p>
      

     </div>

    </div>
   </div>
  </div>
 );
}

export default AnimeModal;
