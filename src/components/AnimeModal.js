import React from "react";
import "../styles/AnimeModal.css"

function AnimeModal({ setOpenModal, clickedAnime }) {
  // onClick={() => setOpenModal(false)}
  const anime = clickedAnime.data;
  console.log(anime);
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
        <h3>Alternate Titles</h3>
        <hr></hr>
        <p><strong>{anime.titles[1].type}</strong>: {anime.titles[1].title}</p>
        <p><strong>{anime.titles[3].type}</strong>: {anime.titles[3].title}</p>
        <p><strong>{anime.titles[4].type}</strong>: {anime.titles[4].title}</p>
      </div>
      <div>
        <h3>Information</h3>
        <hr></hr>
        <p>fe</p>
      </div>

     </div>

     <div className="right-body">
      <p>{anime.title}</p>
      <p>Score: {anime.score}</p>
      <p></p>
      <p></p>

     </div>

    </div>
   </div>
  </div>
 );
}

export default AnimeModal;
