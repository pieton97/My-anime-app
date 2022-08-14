import React, { useState, useEffect } from "react";
import OpenImgModal from "./OpenImgModal";
import "../styles/AnimeModal.css"

const AnimeModal = ({ 
  setIsModalOpen, 
  clickedAnimeInfo,
  openClickedAnime,
  oprenPrev,
  myList,
  adjustMyList
}) => {
  const [showMore, setShowMore] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [inMyList, setInMyList] = useState(false);

  // refactor for easy access to the anime array
  const [details, relations, reccomends] = clickedAnimeInfo;
  const anime = details.data;
  
  const addToMyList = () => {
    // adds/remove anime from user myList
    const mal_id = details.data.mal_id;
    const title = details.data.title;
    const img_url = details.data.images.webp.large_image_url;
    if (inMyList === false) {
      (adjustMyList([{
        "mal_id" : mal_id, 
        "title" : title, 
        "img_url" : img_url
      }], "add to myList"));
      setInMyList(true)
    } else {
      adjustMyList(details.data.mal_id, "remove from myList")
    };
  };
  
  useEffect(() => {
    // changes add button styling when user adds/remove anime
    const mal_id = details.data.mal_id;
    const existInMyList = myList.findIndex(item => item.mal_id === mal_id);
    existInMyList >= 0 ?  setInMyList(true) : setInMyList(false);
  }, [myList]);

  const openRelated = (mal_id, type) => {
    console.log(mal_id, type);
    (type === "anime" ? setIsModalOpen(false) : console.log("not closing"));
    (type === "anime" ? openClickedAnime(mal_id) : console.log("not anime"));
  };

  const openRecommended = (e) => {
   //only searched if clicked on anime img
   if (e.target.nodeName === "IMG") {
    const mal_id = parseInt(e.target.getAttribute("data-id"));
    setIsModalOpen(false);
    openClickedAnime(mal_id);
   }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const returnRandomArr = (arr, n) => {
    // takes any array and returns array of random unique (n)results
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

  const recommendedArray = (
    // returns 10 random reccomened anime if theres more than 10 avaiable
    ("data" in reccomends && reccomends.data.length > 10)
    ? returnRandomArr(reccomends.data, 10) 
    : reccomends.data
  );

  // left body refined JSX
  const addListBtn = (inMyList === true
    ? <button className="action-btn remove-btn" onClick={addToMyList}>Remove</button>
    : <button className="action-btn" onClick={addToMyList}>Add to myList</button>
  );
  const watchBtn = (("streaming" in anime && anime.streaming.length > 0)
    ? <a className="action-btn" href={anime.streaming[0].url} rel="noreferrer noopener" target="_blank">Watch anime</a>
    : <a className="action-btn" href={`https://zoro.to/search?keyword=${anime.title}`} rel="noreferrer noopener" target="_blank">Watch anime</a>
  );
  let studio = ((anime.studios.length > 0) && 
    <a href={anime.studios[0].url} rel="noreferrer noopener" target="_blank">{anime.studios[0].name}</a>
  );
  let genreString = anime.genres.map(genre => {
    return <a href={genre.url} rel="noreferrer" target="_blank" key={genre.name} >{genre.name}, </a>
  });
  let themeString = anime.themes.map(theme => {
    return <a href={theme.url} rel="noreferrer" target="_blank" key={theme.name} >{theme.name}, </a>
  });
  
  // right body refined JSX
  const membersValue = numberWithCommas(anime.members);
  const synopsis = ((anime.synopsis && anime.synopsis.length > 250)
    ? <>
      {showMore ? anime.synopsis : `${anime.synopsis.substring(0, 350)}...`}
      <button className="show-synopsis" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show less" : "Show more"}
      </button>
      </> 
    : "No synopsis data was found :("
  );
  let relatedAnime = relations.data.map(anime => {
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
    const mal_id = anime.entry.mal_id;
    const animeName = anime.entry.title;
    return (
      <div className="img-wrapper" key={mal_id}>
        <img src={image} alt={animeName} data-id={mal_id}></img>
        <div className="botleft" data-id={mal_id}>{animeName}</div>
      </div>
    );
  });
  

 return (
  <div className="modalBackground" onClick={() => setIsModalOpen(false)}>
   {imgModal && (
     <OpenImgModal 
      setImgModal={setImgModal} 
      mal_id={anime.mal_id} 
     />
   )}
   <div className="modalContainer" onClick={e => e.stopPropagation()}>
    <div className="titleCloseBtn">
     <button className="back-btn" onClick={oprenPrev}>Back previous</button>
     <button onClick={() => {setIsModalOpen(false)}}>X</button>
    </div>

    <div className="body">
     <div className="left-body">
      {/* info on left side of the modal */}
      <div className="modal-img-container" onClick={() => setImgModal(true)}>
        <img src={anime.images.jpg.large_image_url} alt="Anime pic" />
      </div>
      <div>
        {addListBtn}
        {watchBtn}
      </div>
      <div className="info-container">
        <h3>Alternate Titles</h3>
        <hr></hr>
        <p><strong>Synonym</strong>: {anime.title_synonyms[0]}</p>
        <p><strong>English</strong>: {anime.title_english}</p>
        <p><strong>Japanese</strong>: {anime.title_japanese}</p>
      </div>
      <div className="info-container">
        <h3>Information</h3>
        <hr></hr>
        <p><strong>Type:</strong> {anime.type}</p>
        <p><strong>Status:</strong> {anime.status}</p>
        <p><strong>Aired:</strong> {anime.aired.string}</p>
        <p>
          <strong>Year:</strong> {anime.year ? (anime.year + " " + anime.season) : "no data found"}
        </p>
        <p><strong>Episodes:</strong> {anime.episodes ? anime.episodes : "no data found"}</p>
        <p><strong>Duration:</strong> {anime.duration}</p>
        {studio && (<p><strong>Studios:</strong> {studio}</p>)}
        <p><strong>Source:</strong> {anime.source}</p>
        <p><strong>Genre:</strong> {genreString}</p>
        {themeString && (<p><strong>Theme:</strong> {themeString}</p>)}
        <p><strong>Rating:</strong> {anime.rating}</p>
      </div>
     </div>

     <div className="right-body">
      <h2>{anime.title}</h2>
      <div className="anime-rank-stats">
        <p><strong>Score:</strong> {anime.score}</p>
        <p><strong>Rank:</strong> {anime.rank}</p>
        <p><strong>Members:</strong> {membersValue}</p>
        <p><strong>Popularity:</strong> {anime.popularity}</p>
      </div>
      <h3>Synopsis</h3>
      <hr />
      <p>
        {synopsis}
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
      <h3>Recommendations: ({reccomends.data.length}) total</h3>
      <hr />
      <div onClick={openRecommended} className="reccomended-wrapper">
        {recommendedAnimes}
      </div>
      <p>This App's data is powered by <a href="https://jikan.moe/" rel="noreferrer noopener" target="_blank">Jikan API</a> with <a href={anime.url} rel="noreferrer noopener" target="_blank">MyAnimeList.net</a> as the original source.</p>
     </div>

    </div>
   </div>
  </div>
 );
}

export default AnimeModal;
