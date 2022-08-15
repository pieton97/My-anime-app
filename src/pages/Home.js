import React from "react";
import AnimeCard from "../components/AnimeCard";
import SearchBtns from "../components/SearchBtns";
import "../styles/Home.css";
import homeImage from "../images/overlord-albedo.jpg";
import PageChangeBtns from "../components/PageChangeBtns";
import MyListCard from "../components/MyListCard";

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
    console.log("Error: nothing was fetched");
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

   <p className="welcome-text">
    Hi there! welcome to MyAnimeApp. This app was made for you to easily browse and find good animes to watch. Get started by searching
    for an anime or click any below for recommendations.
   </p>
   <div className="default-search-btns">
    <button onClick={() => fetchAnimeType("top anime")}>Top Anime Series</button>
    <button onClick={() => fetchAnimeType("this season")}>Anime This Season</button>
    <button onClick={() => fetchAnimeType("top movies")}>Top Anime movies</button>
   </div>
   <SearchBtns searchByButton={searchByButton} />

   <div id="result-anchor">
    <h3>{props.searchResult}</h3>
    <PageChangeBtns 
      changePage={props.changePage} 
      currentPage={props.currentPage} 
    />
   </div>
   <hr />

   <div className="card-main">
    {props.animeList.map((anime) => (
     <AnimeCard
      anime={anime}
      key={anime.mal_id}
      openAnime={openAnime}
      myList={props.myList}
      adjustMyList={props.adjustMyList}
     />
    ))}
   </div>
   <div className="flex-end">
    <PageChangeBtns 
      changePage={props.changePage} 
      currentPage={props.currentPage} 
    />
   </div>

   <details>
    <summary id="my-list-anchor">MyList ({props.myList.length})</summary>
    <div className="card-main">
    {props.myList.map((anime) => (
      <MyListCard
        anime={anime}
        key={anime.mal_id}
        openAnime={openAnime}
        adjustMyList={props.adjustMyList}
      />
    ))}
   </div>
   </details>
  </main>
 );
};

export default Home;
