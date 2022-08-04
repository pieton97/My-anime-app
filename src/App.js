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
  console.log("search was ran");
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
  // fetch anime details, variety of info is from different API endpoints
  try {
    console.time("timer1");
    const detailsURL = `https://api.jikan.moe/v4/anime/${mal_id}`;
    const charactersURL = `https://api.jikan.moe/v4/anime/${mal_id}/characters`;
    const recommendationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`;
    
    const [details, characters, recommendations] = await Promise.all([
      fetch(detailsURL).then(res => res.json()),
      fetch(charactersURL).then(res => res.json()),
      fetch(recommendationsURL).then(res => res.json()),
    ]);
    
    // console.log(
    //   "anime:", details,
    //   "characters:", characters,
    //   "test:", recommendations,
    // );
    setClickedAnime(details);
    console.timeEnd("timer1")
  } catch (err) {
    console.log(err);
  };
  // try {
  //   console.time("timer1");
  //   const urls = [
  //     `https://api.jikan.moe/v4/anime/${mal_id}`,
  //     `https://api.jikan.moe/v4/anime/${mal_id}/characters`,
  //     `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`,
  //   ];

  //   const requests = urls.map((url) => fetch(url));
  //   const responses = await Promise.all(requests);
  //   const json = responses.map((response) => response.json());
  //   const [details, characters,recommendations]  = await Promise.all(json);

  //   console.log(
  //     "anime:", details,
  //     "characters:", characters,
  //     "test:", recommendations
  //   );
  //   setClickedAnime(details);
  //   console.timeEnd("timer1")
  // }
  // catch (errors) {
  //   errors.forEach((error) => console.error(error));
  // }

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
