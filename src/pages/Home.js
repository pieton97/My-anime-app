import React from "react";
import AnimeCard from "../components/AnimeCard";
import SearchBtns from "../components/SearchBtns";
import "../styles/Home.css";
import homeImage from "../images/overlord-albedo.jpg";
import PageChangeBtns from "../components/PageChangeBtns";

const Home = (props) => {
 const fetchAnimeType = (type, resultTitle, searchID) => {
  const fetchAnime = props.fetchAnime;
  switch (type) {
   case "top anime":
    fetchAnime("https://api.jikan.moe/v4/top/anime?", "Top anime series");
    break;
   case "this season":
    fetchAnime("https://api.jikan.moe/v4/seasons/now?", "Anime this season");
    break;
   case "top movies":
    fetchAnime("https://api.jikan.moe/v4/anime?type=movie&order_by=rank&sort=asc&min_score=5.5&sfw=true&", "Top anime movies");
    break; 
   case "search bar":
    fetchAnime(`https://api.jikan.moe/v4/anime?q=${props.search}&order_by=rank&sort=asc&min_score=1&sfw=true&`, `Results for ${resultTitle}`);
    break; 
   case "genre or theme":
    fetchAnime(`https://api.jikan.moe/v4/anime?genres=${searchID}&min_score=4&order_by=score&sort=desc&sfw=true&`, `Results for ${resultTitle}`);
    break; 
   default: 
    console.log("nothing was fetched");
  }
 };

 const handleSearch = (e) => {
  e.preventDefault();
  const searchBarValue = props.search;
  fetchAnimeType("search bar", searchBarValue);
 };

 const searchByButton = (e) => {
  const buttonText = e.target.innerText;
  const mal_id = parseInt(e.target.getAttribute("data-id"));
  if (e.target.nodeName === "BUTTON") 
  fetchAnimeType("genre or theme", buttonText, mal_id)
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
    <form className="search-box" onSubmit={handleSearch}>
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
    find animes that you may have never seen before. Get started by searching
    for an anime or click any anime below for recommendations.
   </h3>
   <div className="preset-search-btns">
    <button onClick={() => fetchAnimeType("top anime")}>Top Anime Series</button>
    <button onClick={() => fetchAnimeType("this season")}>Anime This Season</button>
    <button onClick={() => fetchAnimeType("top movies")}>Top Anime movies</button>
   </div>
   <SearchBtns searchByButton={searchByButton} />

   <div id="result-anchor">
    <h3>{props.searchResult}</h3>
    <PageChangeBtns changePage={props.changePage} currentPage={props.currentPage} />
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
   <div className="flex-end">
    <PageChangeBtns changePage={props.changePage} currentPage={props.currentPage} />
   </div>

   <h2>MyList:</h2>
   <hr />
   <p>future list section goes here... (save this list to local storage)</p>
   <p>Add something to your list to save your favorites...</p>
  </main>
 );
};

export default Home;
