import React from "react";
import "../styles/Home.css";
import AnimeCard from "../components/AnimeCard";
import SearchBtns from "../components/SearchBtns";

const Home = (props) => {
 const searcFunc = (e) => {
  if (e.target.nodeName === "BUTTON") {
    props.buttonSearch(e);
  }
 };

 const testGrab = (animeKey) => {
  console.log('hellor', animeKey);
  // console.log(e.currentTarget);
 }

 return (
  <main>
   <div className="home">
    <form className="search-box" onSubmit={props.handleSearch}>
     <input
      type="search"
      placeholder="Search ..."
      required
      value={props.search}
      onChange={(e) => props.setSearch(e.target.value)}
     />
     <button type="submit">Search</button>
    </form>
   </div>

   <SearchBtns test22={searcFunc} />

   {/* if there is no text in the search bar it will show top anime(by popularity)and on searching it will show search results */}
   {!props.search ? (
    <div className="card-main">
     {props.topAnime.map((anime) => (
      <AnimeCard anime={anime} key={anime.mal_id} modalKey={anime.mal_id} testGrab={testGrab} />
     ))}
    </div>
   ) : (
    <div className="card-main">
     {props.animeList.map((anime) => (
      <AnimeCard anime={anime} key={anime.mal_id} />
     ))}
    </div>
   )}
  </main>
 );
}

export default Home;
