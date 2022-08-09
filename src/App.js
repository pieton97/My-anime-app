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
 //  opens modal, and the 3 'clicked' are for modal information
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [clickedAnime, setClickedAnime] = useState([]);
 const [clickedRelatedAnime, setclickedRelatedAnime] = useState([]);
 const [clickedRecommended, setclickedRecommended] = useState([]);
 //  manages pagination of currentURL search type
 const [currentPage, setCurrentPage] = useState(1);
 const [maxPage, setMaxPage] = useState(0);
 const [currentURL, setCurrentURL] = useState();

 const changePage = (type) => {
  let newPage;
  switch (type) {
   case "increment":
    newPage = currentPage + 1;
    if (newPage <= maxPage) setCurrentPage(newPage);
    else console.log("you cant go above the max you silly kangaroo");
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
  // this resets current page when new type of search is ran
  console.log("current URL changed, reseted currentPage");
  currentURL ? setCurrentPage(1) : console.log("initial load success");
 }, [currentURL]);

 const fetchNextPage = async () => {
  // fetches currentURL of currentPage, then display animes to result
  const baseURL = currentURL(currentPage);
  const res = await fetch(baseURL);
  const data = await res.json();

  console.log(`current page: ${currentPage}`, "test data:", data);
  if (currentPage <= maxPage) setAnimeList(data.data);
  else setCurrentPage(currentPage - 1);
  console.log(currentURL(currentPage));
 };

 const openClickedAnime = (mal_id) => {
  fetchClickedAnime(mal_id);
 };

 // Fetches url from Jikan api, then display animes in result
 const fetchAnime = async (baseURL, searchType) => {
  const res = await fetch(baseURL);
  const data = await res.json();

  console.log("ran fetchAnime", data);
  setAnimeList(data.data);
  setCurrentURL(() => (dd) => `${baseURL}page=${dd}`);
  setSearchResult(searchType + ` (${data.pagination.items.total}) results`);
  setMaxPage(data.pagination.last_visible_page)
 };

 const fetchClickedAnime = async (mal_id) => {
   // Fetching the anime user has clicked on
   // fetch anime details, variety of info is from different API endpoints
  try {
   const detailsURL = `https://api.jikan.moe/v4/anime/${mal_id}`;
   const recommendationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`;
   const relationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/relations`;

   console.time("total time ran:");
   const results = await Promise.all([
    fetch(detailsURL).then((res) => res.json()),
    fetch(relationsURL).then((res) => res.json()),
    fetch(recommendationsURL).then((res) => res.json()),
   ]);
   const [details, related, recommendations] = results;
   console.timeEnd("total time ran:");

   console.log(
    "anime:", details,
    "related:", related,
    "recommendations:", recommendations
   );
   setClickedAnime(details);
   setclickedRelatedAnime(related);
   setclickedRecommended(recommendations);
  } catch (err) {
   console.log(err);
  }
  setIsModalOpen(true);
 };

 // get fetchAnime() as the site render
 useEffect(() => {
  fetchAnime("https://api.jikan.moe/v4/top/anime?", "Top anime series");
 }, []);

 return (
  <>
   <div className="App">
    <Header />

    {isModalOpen && (
     <AnimeModal
      setIsModalOpen={setIsModalOpen}
      openClickedAnime={openClickedAnime}
      clickedAnime={clickedAnime}
      clickedRelatedAnime={clickedRelatedAnime}
      clickedRecommended={clickedRecommended}
     />
    )}

    <Home
     search={search}
     setSearch={setSearch}
     searchResult={searchResult}
     animeList={animeList}
     openClickedAnime={openClickedAnime}
    //  manages pagination and fetches whenever page state changes
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
