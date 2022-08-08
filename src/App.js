import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import AnimeModal from "./components/AnimeModal.js";

const App = () => {
 const [animeList, setAnimeList] = useState([]);
 const [search, setSearch] = useState("");
 const [searchResult, setSearchResult] = useState("");
 const [modalOpen, setModalOpen] = useState(false);
 const [clickedAnime, setClickedAnime] = useState([]);
 const [clickedRelatedAnime, setclickedRelatedAnime] = useState([]);
 const [clickedRecommended, setclickedRecommended] = useState([]);

 const handleSearch = (e) => {
  e.preventDefault();
  console.log("search was ran");
  fetchAnime(search);
  setSearchResult(`Results for: ${search}`)
 };

 const openClickedAnime = (mal_id) => {
  fetchClickedAnime(mal_id);
 };

 const buttonSearch = (e) => {
  e.preventDefault();
  fetchAnimeByGenre(e.target.value);
  setSearchResult(`Results for: ${e.target.innerText}`)
 };

 // Fetching top anime (by popularity) from jikan API
 const getTopAnime = async () => {
  const baseURL = `https://api.jikan.moe/v4/top/anime?page=1`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setAnimeList(data.data);
  setSearchResult("Top Anime Series:")
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
  const baseURL = `https://api.jikan.moe/v4/anime?genres=${genreID}&min_score=4&order_by=score&sort=desc&page=1&sfw=true`;
  const res = await fetch(baseURL);
  const data = await res.json();

  setAnimeList(data.data);
 };

 // Fetching anime the user has clicked on
 const fetchClickedAnime = async (mal_id) => {
  console.time("total time ran:"); 
  // fetch anime details, variety of info is from different API endpoints
  try {
    const detailsURL = `https://api.jikan.moe/v4/anime/${mal_id}`;
    const recommendationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`;
    const relationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/relations`;
    
    const results = await Promise.all([
      fetch(detailsURL).then(res => res.json()),
      fetch(relationsURL).then(res => res.json()),
      fetch(recommendationsURL).then(res => res.json()),
    ]);
    const [ details, related, recommendations ] = results;

    console.log(
      "anime:", details,
      "related:", related,
      "recommendations:", recommendations,
    );
    setClickedAnime(details);
    setclickedRelatedAnime(related);
    setclickedRecommended(recommendations);
  } catch (err) {
    console.log(err);
  };

  setModalOpen(true);
  console.timeEnd("total time ran:")
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
     <AnimeModal 
      setOpenModal={setModalOpen} 
      openClickedAnime={openClickedAnime}
      clickedAnime={clickedAnime} 
      clickedRelatedAnime={clickedRelatedAnime} 
      clickedRecommended={clickedRecommended}
     />
    )}

    <Home
     handleSearch={handleSearch}
     search={search}
     setSearch={setSearch}
     searchResult={searchResult}
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
