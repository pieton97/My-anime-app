import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import AnimeModal from "./components/AnimeModal.js";

const App = () => {
 // displayed anime list, and search bar states
 const [animeList, setAnimeList] = useState([]);
 const [search, setSearch] = useState("");
 const [searchResult, setSearchResult] = useState("");
 //  opens modal, and clicked anime information for modal
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [clickedAnimeInfo, setClickedAnimeInfo] = useState([]);
 const [clickedHistory, setClickedHistory] = useState([]);
 //  manages pagination of currentURL search type
 const [currentPage, setCurrentPage] = useState(1);
 const [maxPage, setMaxPage] = useState();
 const [currentURL, setCurrentURL] = useState();

 const changePage = (type) => {
  let newPage;
  switch (type) {
   case "increment":
    newPage = currentPage + 1;
    if (newPage <= maxPage) setCurrentPage(newPage);
    else console.log("you cant go above the max page you silly kangaroo");
    break;
   case "decrement":
    newPage = currentPage - 1;
    if (newPage > 0) setCurrentPage(newPage);
    else console.log("cant go below page 1 you silly duck");
    break;
   case "first page":
    setCurrentPage(1);
    break;
   case "last page":
    setCurrentPage(maxPage);
    break;
   default:
    console.log("pagination didnt work");
  }
 };

 useEffect(() => {
  // fetches next page of currentURL when currentPage changes
  currentURL ? fetchNextPage() : console.log("initial load success");
 }, [currentPage]);

 useEffect(() => {
  // this resets current page when new type of fetch is ran
  // console.log("current URL changed, reseted currentPage");
  currentURL ? setCurrentPage(1) : console.log("initial load success");
 }, [currentURL]);

 useEffect(() => {
  //  fetch top anime on site render, then display in result
  fetchAnime("https://api.jikan.moe/v4/top/anime?", "Top anime series");
}, []);

 const fetchNextPage = async () => {
  // fetches currentURL of currentPage, then display animes to result
  const baseURL = currentURL(currentPage);
  const res = await fetch(baseURL);
  const data = await res.json();

  console.log("results data:", data.data);
  if (currentPage <= maxPage) setAnimeList(data.data);
 };
 
 // Fetches url from Jikan api, then display animes in result
 const fetchAnime = async (baseURL, searchType) => {
   const res = await fetch(baseURL);
   const data = await res.json();
   
  //  console.log("ran fetchAnime, anime data:", data.data);
   setAnimeList(data.data);
   setCurrentURL(() => (dd) => `${baseURL}page=${dd}`);
   setSearchResult(searchType + ` (${data.pagination.items.total}) results`);
   setMaxPage(data.pagination.last_visible_page);
  };
  
  const oprenPrev = () => {
    // opens previously clicked anime in modal
    if (clickedHistory.length > 0) setClickedAnimeInfo(clickedHistory)
    else console.log("cant go back further");
  };
  const openClickedAnime = (mal_id) => {
   fetchClickedAnime(mal_id);
  };
 const fetchClickedAnime = async (mal_id) => {
  // saving previous anime before fetching new one
  setClickedHistory(clickedAnimeInfo)
  // Fetching the anime user has clicked on, then display on modal
  try {
   const detailsURL = `https://api.jikan.moe/v4/anime/${mal_id}`;
   const relationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/relations`;
   const recommendationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`;

   console.time("total time ran:");
   const results = await Promise.all([
    fetch(detailsURL).then((res) => res.json()),
    fetch(relationsURL).then((res) => res.json()),
    fetch(recommendationsURL).then((res) => res.json()),
   ]);
   setClickedAnimeInfo(results);
   console.timeEnd("total time ran:");
  } catch (err) {
   console.log(err);
  }
  setIsModalOpen(true);
 };
 

 return (
  <>
   <div className="App">
    <Header />

    {isModalOpen && (
     <AnimeModal
      setIsModalOpen={setIsModalOpen}
      openClickedAnime={openClickedAnime}
      clickedAnimeInfo={clickedAnimeInfo}
      oprenPrev={oprenPrev}
     />
    )}


    <Home
     search={search}
     setSearch={setSearch}
     searchResult={searchResult}
     //  array of the animes that was fetched to be displayed in result
     animeList={animeList}
     // open anime user has clicked on, then display in result
     openClickedAnime={openClickedAnime}
     //  manages pagination and fetches whenever currentPage state changes
     currentPage={currentPage}
     changePage={changePage}
     fetchAnime={fetchAnime}
    />

    <Footer />
   </div>
  </>
 );
};

export default App;
