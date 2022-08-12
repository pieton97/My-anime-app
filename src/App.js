import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import AnimeModal from "./components/AnimeModal.js";

const App = () => {
 // displayed anime list, and states for search bar/result
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
 //  manges user myList and saving to local storage
 const [myList, setMyList] = useState(
  JSON.parse(localStorage.getItem("userList")) ?? []
 );

 const changePage = (type, custom) => {
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
   case "custom":
    if (custom <= maxPage && custom > 0) setCurrentPage(custom);
    else console.log("nice try it wont work");
    break;
   default:
    console.log("pagination didnt work!!??");
  }
 };

 const adjustMyList = (animeData, type) => {
  if (type === "add to myList") setMyList([...myList, ...animeData]);
  else if (type === "remove from myList") {
   const indexToRemove = myList.findIndex((item) => item.mal_id === animeData);
   let adjustedList = [...myList];
   adjustedList.splice(indexToRemove, 1);
   setMyList(adjustedList);
  }
 };

 useEffect(() => {
  currentURL && fetchNextPage();
 }, [currentPage]);

 useEffect(() => {
  currentURL && setCurrentPage(1);
 }, [currentURL]);

 useEffect(() => {
  // updates user myList in local storage when myList updates
  localStorage.setItem("userList", JSON.stringify(myList));
 }, [myList]);

 useEffect(() => {
  fetchAnime("https://api.jikan.moe/v4/top/anime?", "Top anime series");
 }, []);

 const fetchNextPage = async () => {
  // fetches currentURL of currentPage, then display animes to result
  const baseURL = currentURL(currentPage);
  const res = await fetch(baseURL);
  const data = await res.json();
  if (currentPage <= maxPage) setAnimeList(data.data);
 };

 // Fetches url from Jikan api, then display animes in result
 const fetchAnime = async (baseURL, searchType) => {
  const res = await fetch(baseURL);
  const data = await res.json();

  console.log("Anime data:", data);
  setAnimeList(data.data);
  setCurrentURL(() => (page) => `${baseURL}page=${page}`);
  setSearchResult(searchType + ` (${data.pagination.items.total})`);
  setMaxPage(data.pagination.last_visible_page);
 };

 const oprenPrev = () => {
  // opens previously clicked anime in modal
  if (clickedHistory.length > 0) setClickedAnimeInfo(clickedHistory);
  else console.log("cant go back further");
 };
 const openClickedAnime = (mal_id) => {
  fetchClickedAnime(mal_id);
 };
 const fetchClickedAnime = async (mal_id) => {
  // saving previous anime before fetching new one
  setClickedHistory(clickedAnimeInfo);
  // Fetching the anime user has clicked on, then display on modal
  try {
   const detailsURL = `https://api.jikan.moe/v4/anime/${mal_id}/full`;
   const relationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/relations`;
   const recommendationsURL = `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`;

   console.time("total fetch time:");
   const results = await Promise.all([
    fetch(detailsURL).then((res) => res.json()),
    fetch(relationsURL).then((res) => res.json()),
    fetch(recommendationsURL).then((res) => res.json()),
   ]);
   setClickedAnimeInfo(results);
   console.log(results);
   console.timeEnd("total fetch time:");
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
      clickedAnimeInfo={clickedAnimeInfo}
      openClickedAnime={openClickedAnime}
      oprenPrev={oprenPrev}
      // manages user myList and local storage
      myList={myList}
      adjustMyList={adjustMyList}
     />
    )}

    <Home
     search={search}
     setSearch={setSearch}
     searchResult={searchResult}
     //  display animeList in result and open when an anime is clicked
     animeList={animeList}
     openClickedAnime={openClickedAnime}
     //  manages pagination and fetches whenever currentPage state changes
     currentPage={currentPage}
     changePage={changePage}
     fetchAnime={fetchAnime}
     // manages user myList and local storage
     myList={myList}
     adjustMyList={adjustMyList}
    />

    <Footer />
   </div>
  </>
 );
};

export default App;
