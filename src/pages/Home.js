import React from "react";
import AnimeCard from "../components/AnimeCard";
import SearchBtns from "../components/SearchBtns";
import "../styles/Home.css";
import homeImage from "../images/overlord-albedo.jpg";

const Home = (props) => {
 const searchByButton = (e) => {
  if (e.target.nodeName === "BUTTON") {
   props.buttonSearch(e);
  }
 };
 const openAnime = (mal_id) => {
  props.openClickedAnime(mal_id);
 };

 return (
  <main>
   <div className="home">
    <div className="home-img-container">
     <img className="home-img" src={homeImage} alt="overlord-img"></img>
    </div>
    <form className="search-box" onSubmit={props.handleSearch}>
     <input
      type="search"
      placeholder="Search anime..."
      required
      value={props.search}
      onChange={(e) => props.setSearch(e.target.value)}
     />
     <button type="submit">Search</button>
    </form>
   </div>

   <h3>Hi there! welcome to MyAnimeApp. This app was made for you to browse and find interesting animes that you may have never seen before. Get started by searching an anime or click any anime below for recommendations.</h3>
   <div className="preset-search-btns">
    <button>Top Anime This Season</button>
    <button>Top Anime Series</button>
   </div>
   <SearchBtns searchByButton={searchByButton} />

   <div>
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
  </main>
 );
};

export default Home;
