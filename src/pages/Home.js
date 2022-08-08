import React from "react";
import AnimeCard from "../components/AnimeCard";
import SearchBtns from "../components/SearchBtns";
import "../styles/Home.css";
import homeImage from "../images/overlord-albedo.jpg";

const Home = (props) => {
 const searchByButton = (e) => {
  e.preventDefault();
  if (e.target.nodeName === "BUTTON") {
   props.buttonSearch(e);
  }
 };
 const openAnime = (mal_id) => {
  props.openClickedAnime(mal_id);
 };
 const searchHomeImg = () => {
  props.setSearch("Overlord");
  let searchBtn = document.getElementById("home-search-btn");
  setTimeout(() => searchBtn.click(), 600);
 };
 return (
  <main id="homepage">
   <div className="home">
    <div className="home-img-container" onClick={searchHomeImg}>
     <a href="#result-anchor">
      <img className="home-img" src={homeImage} alt="overlord-img"></img>
     </a>
    </div>
    <form className="search-box" onSubmit={props.handleSearch}>
     <input
      type="search"
      placeholder="Search anime..."
      required
      value={props.search}
      onChange={(e) => props.setSearch(e.target.value)}
     />
     <button id="home-search-btn" type="submit">
      Search
     </button>
    </form>
   </div>

   <h3>
    Hi there! welcome to MyAnimeApp. This app was made for you to browse and
    find animes that you may have never seen before. Get started by
    searching for an anime or click any anime below for recommendations.
   </h3>
   <div className="preset-search-btns">
    <button>Top Anime This Season</button>
    <button>Top Anime Series</button>
    <button>Top Anime movies</button>
   </div>
   <SearchBtns searchByButton={searchByButton} />

   <div id="result-anchor">
    <h3>{props.searchResult}</h3>
   </div>
   <hr />
   <div className="card-main">
    {props.animeList.map((anime) => (
     <AnimeCard
      anime={anime}
      key={anime.mal_id}
      animeKey={anime.mal_id}
      openAnime={openAnime}
     />
    ))}
   </div>

   <h2>MyList:</h2>
   <hr />
   <p>future list section goes here... (save this list to local storage)</p>
   <p>Add something to your list to save your favorites...</p>
  </main>
 );
};

export default Home;
