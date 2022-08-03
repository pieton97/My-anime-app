import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import AnimeModal from "./components/AnimeModal.js";

function App() {
 const [animeList, setAnimeList] = useState([]);
 const [topAnime, setTopAnime] = useState([]);
 const [search, setSearch] = useState("");
 const [modalOpen, setModalOpen] = useState(false);
 const [clickedAnime, setClickedAnime] = useState([]);

 const buttonSearch = (e) => {
  e.preventDefault();
  fetchAnimeByGenre(e.target.value);
 };

 const handleSearch = (e) => {
  e.preventDefault();
  fetchAnime(search);
 };

 const openClickedAnime = (mal_id) => {
  fetchClickedAnime(mal_id);
 };

 // Fetching top anime (by popularity) from jikan API
 const getTopAnime = async () => {
  const baseURL = `https://api.jikan.moe/v4/top/anime?page=1`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setTopAnime(data.data);
 };

 // Fetching searched anime from jikan API
 const fetchAnime = async (anime_name) => {
  const baseURL = `https://api.jikan.moe/v4/anime?q=${anime_name}&order_by=rank&sort=asc&min_score=4&sfw=true`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setAnimeList(data.data);
  setTopAnime(data.data);
 };

 // Fetching anime by genre from Jikan API
 const fetchAnimeByGenre = async (genreID) => {
  const baseURL = `https://api.jikan.moe/v4/anime?genres=${genreID}&min_score=4&order_by=score&sort=desc&sfw=true`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setAnimeList(data.data);
  setTopAnime(data.data);
 };

 // Fetching anime user has clicked on
 const fetchClickedAnime = async (mal_id) => {
  const baseURL3 = `https://api.jikan.moe/v4/anime/${mal_id}`;
  const res = await fetch(baseURL3);
  const data = await res.json();

  setClickedAnime(data);
  setModalOpen(true);
 };

 // get getTopAnime() as the site render
 useEffect(() => {
  getTopAnime();
 }, []);

 return (
  <>
   <div className="App">
    <Header />

    {modalOpen && (
     <AnimeModal setOpenModal={setModalOpen} clickedAnime={clickedAnime} />
    )}

    <Home
     handleSearch={handleSearch}
     search={search}
     setSearch={setSearch}
     animeList={animeList}
     topAnime={topAnime}
     buttonSearch={buttonSearch}
     openClickedAnime={openClickedAnime}
    />

    <Footer />
   </div>
  </>
 );
}

export default App;
