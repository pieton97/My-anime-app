import React, { useState } from "react";
import OpenImgModal from "./OpenImgModal";
import "../styles/AnimeModal.css"

const AnimeModal = ({ 
  setOpenModal, 
  clickedAnime, 
  clickedRelatedAnime, 
  openClickedAnime,
  clickedRecommended
}) => {
  const [showMore, setShowMore] = useState(false);
  const [imgModal, setImgModal] = useState(false);

  // refactor for easy access to the anime array
  const anime = clickedAnime.data;

  const openRelated = (mal_id, type) => {
    console.log(mal_id, type);
    (type === "anime" ? setOpenModal(false) : console.log("not closing"));
    (type === "anime" ? openClickedAnime(mal_id) : console.log("not anime"));
  };

  const openRecommended = (e) => {
    // open all anime to homepage

   //only searched if clicked on img of anime
   if (e.target.nodeName === "IMG") {
    const mal_id = parseInt(e.target.getAttribute("data-id"));
    console.log(mal_id);
    setOpenModal(false);
    openClickedAnime(mal_id);
   }
  };
  
  // takes any array and returns array of random unique (n)results
  const returnRandomArr = (arr, n) => {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  // returns 10 random reccomened anime if theres more than 10 avaiable
  const recommendedArray = (
    clickedRecommended.data.length > 10 
    ? returnRandomArr(clickedRecommended.data, 10) 
    : clickedRecommended.data
  );

  // left body refined JSX
  let studio = (anime.studios.length > 0 ? <a href={anime.studios[0].url} rel="noreferrer noopener" target="_blank">{anime.studios[0].name}</a> : "");
  let genreString = anime.genres.map(genre => {
    return <a href={genre.url} rel="noreferrer" target="_blank" key={genre.name} >{genre.name}, </a>
  });
  let themeString = anime.themes.map(theme => {
    return <a href={theme.url} rel="noreferrer" target="_blank" key={theme.name} >{theme.name}, </a>
  });
  
  // right body refined JSX
  const synopsis = anime.synopsis.split(". ").join(". \n\n");
  let relatedAnime = clickedRelatedAnime.data.map(anime => {
   const mal_id = anime.entry[0].mal_id;
   const type = anime.entry[0].type;
   return (
      <p key={anime.entry[0].mal_id}>
      <strong>{anime.relation}</strong>: <span className="related-anime" onClick={() => openRelated(mal_id, type)}>
      {anime.entry[0].name} ({type})
      </span>
      </p>
    );
  });
  let recommendedAnimes = recommendedArray.map(anime => {
    const image = anime.entry.images.webp.image_url;
    const key = anime.entry.mal_id;
    const mal_id = anime.entry.mal_id;
    const animeName = anime.entry.title;
    return (
      <div className="img-wrapper" key={key}>
        <img src={image} alt={animeName} data-id={mal_id}></img>
        {/* <div><div className="botleft" data-id={mal_id}>{animeName}</div></div> */}
      </div>
    );
  });
  

 return (
  <div className="modalBackground" onClick={() => setOpenModal(false)}>
   {imgModal && (
     <OpenImgModal 
      setImgModal={setImgModal} 
      mal_id={anime.mal_id} 
     />
   )}
   <div className="modalContainer" onClick={e => e.stopPropagation()}>
    <div className="titleCloseBtn">
     <button onClick={() => {setOpenModal(false)}}>X</button>
    </div>

    <div className="body">
     <div className="left-body">
      {/* info on left side of the modal */}
      <div className="modal-img-container" onClick={() => setImgModal(true)}>
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
      <div className="info-container">
        <h3>Information</h3>
        <hr></hr>
        <p>Type: {anime.type}</p>
        <p>Status: {anime.status}</p>
        <p>Aired: {anime.aired.string}</p>
        <p>
          Year: {anime.year ? (anime.year + " " + anime.season) : "no data found"}
        </p>
        <p>Episodes: {anime.episodes ? anime.episodes : "no data found"}</p>
        <p>Duration: {anime.duration}</p>
        {studio && (<p>Studios: {studio}</p>)}
        <p>Source: {anime.source}</p>
        <p>Genre: {genreString}</p>
        {themeString && (<p>Theme: {themeString}</p>)}
        <p>Rating: {anime.rating}</p>
      </div>

     </div>

     <div className="right-body">
      <h2>{anime.title}</h2>
      <div>
        <p>Score: {anime.score}</p>
        <p>Rank: {anime.rank}</p>
        <p>Members: {anime.members}</p>
      </div>
      <h3>Synopsis</h3>
      <hr />
      <p>
        {showMore ? synopsis : `${synopsis.substring(0, 250)}...`}
        <button className="show-synopsis" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show less" : "Show more"}
        </button>
      </p>
      {anime.trailer.embed_url && ( 
        <iframe 
        title={anime.title_english + " trailer"}
        src={anime.trailer.embed_url}
        allowFullScreen={true}
        autoPlay="0"
        />
      )}
      <div></div>
      <h3>Related Anime</h3>
      <hr />
      <div>{relatedAnime}</div>
      <h3>Recommendations: ({clickedRecommended.data.length}) total</h3>
      <hr />
      <div onClick={openRecommended} className="reccomended-wrapper">
        {recommendedAnimes}
      </div>

     </div>

    </div>
   </div>
  </div>
 );
}

export default AnimeModal;
