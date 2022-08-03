import React from "react";
import "../styles/Home.css";
import AnimeCard from "../components/AnimeCard";
import SearchBtns from "../components/SearchBtns";

const Home = (props) => {
 const searchByButton = (e) => {
  if (e.target.nodeName === "BUTTON") {
    props.buttonSearch(e);
  }
 };
 const openAnime = (mal_id) => {
  props.openClickedAnime(mal_id);
 }

 return (
  <main>
   <div className="home">
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

   <SearchBtns searchByButton={searchByButton} />

   {/* if there is no text in the search bar it will show top anime(by popularity)and on searching it will show search results */}
   {!props.search ? (
    <div className="card-main">
     {props.topAnime.map((anime) => (
      <AnimeCard anime={anime} key={anime.mal_id} animeKey={anime.mal_id} openAnime={openAnime} />
     ))}
    </div>
   ) : (
    <div className="card-main">
     {props.animeList.map((anime) => (
      <AnimeCard anime={anime} key={anime.mal_id} animeKey={anime.mal_id} openAnime={openAnime} />
     ))}
    </div>
   )}
  </main>
 );
}

export default Home;
