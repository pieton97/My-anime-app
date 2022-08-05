import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import AnimeModal from "./components/AnimeModal.js";

function App() {
 const [animeList, setAnimeList] = useState([]);
 const [search, setSearch] = useState("");
 const [modalOpen, setModalOpen] = useState(false);
 const [clickedAnime, setClickedAnime] = useState([]);

 const handleSearch = (e) => {
  e.preventDefault();
  console.log("search was ran");
  fetchAnime(search);
 };

 const openClickedAnime = (mal_id) => {
  fetchClickedAnime(mal_id);
 };

 const buttonSearch = (e) => {
  e.preventDefault();
  fetchAnimeByGenre(e.target.value);
 };


 // Fetching top anime (by popularity) from jikan API
 const getTopAnime = async () => {
  const baseURL = `https://api.jikan.moe/v4/top/anime?page=1`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setAnimeList(data.data);
 };

 // Fetching searched anime from jikan API
 const fetchAnime = async (anime_name) => {
  const baseURL = `https://api.jikan.moe/v4/anime?q=${anime_name}&order_by=rank&sort=asc&min_score=4&sfw=true`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setAnimeList(data.data);
 };

 // Fetching anime by genre from Jikan API
 const fetchAnimeByGenre = async (genreID) => {
  const baseURL = `https://api.jikan.moe/v4/anime?genres=${genreID}&min_score=4&order_by=score&sort=desc&sfw=true`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setAnimeList(data.data);
 };

 // Fetching anime user has clicked on
 const fetchClickedAnime = async (mal_id) => {
  // fetch anime details, variety of info is from different API endpoints
  try {
    const detailsURL = `https://api.jikan.moe/v4/anime/${mal_id}`;
    const charactersURL = `https://api.jikan.moe/v4/anime/${mal_id}/characters`;
    const recommendationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`;
    const tester2 = `https://api.jikan.moe/v4/anime/${mal_id}/relations`;
    
    console.time("timer333"); 
    const results = await Promise.all([
      fetch(detailsURL).then(res => res.json()),
      fetch(charactersURL).then(res => res.json()),
      fetch(recommendationsURL).then(res => res.json()),
      fetch(tester2).then(res => res.json()),
    ]);
    const [details, characters, recommendations, tester] = results;
    console.timeEnd("timer333")

    console.log(
      "anime:", details,
      "characters:", characters,
      "test:", recommendations,
      "teseter:", tester,
    );
    setClickedAnime(details);
  } catch (err) {
    console.log(err);
  };

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
     buttonSearch={buttonSearch}
     openClickedAnime={openClickedAnime}
    />

    <Footer />
   </div>
  </>
 );
}

export default App;
