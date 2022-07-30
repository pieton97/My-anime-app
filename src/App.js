import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";


function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [testApi, setTestApi] = useState([]);

  // Fetching top anime (by popularity) from jikan API
  const getTopAnime = async () => {
    const baseURL = `https://api.jikan.moe/v4/top/anime`;
    const baseURL2 = `https://api.jikan.moe/v3/top/anime/1/bypopularity`;
    const res = await fetch(baseURL)
    const data = await res.json();

    setTopAnime(data.data);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchAnime(search);
  };
  
  // Fetching searched anime from jikan API
  const fetchAnime = async (anime_name) => {
    const baseURL = `https://api.jikan.moe/v4/anime?q=${anime_name}&order_by=popularity&sort=asc&sfw=true`;
    const baseURL2 = `https://api.jikan.moe/v3/search/anime?q=${anime_name}&order_by=title&sort=asc&limit=10`;
    const res = await fetch(baseURL)
    const data = await res.json();

    setAnimeList(data.data);
  };

  // get getTopAnime() as the site render
  useEffect(() => {
    getTopAnime();
  }, []);

  // testing below
  const testSearch = (e) => {
    e.preventDefault();
    testFunc(search);
  };

  const testFunc = async (anime_name) => {
    console.log('test was ran');

    const baseURL = `https://api.jikan.moe/v4/anime?q=${anime_name}&order_by=title&sort=asc&sfw=true`;
    const baseURL2 = `https://api.jikan.moe/v4/top/anime`;
    const baseURL3 = `https://api.jikan.moe/v3/top/anime/1/bypopularity`;
    const res = await fetch(baseURL2)
    const data = await res.json();

    console.log(data);

    
    // console.log(testApi,'befoer');
    setTestApi(data)
    // console.log(testApi,'after');
  }

  useEffect(() => {
    console.log('test state was changed');
  },[testApi])

  // testing ends

  return (
    <>
    <div className="App" >
      <Header />

      <button onClick={testSearch}>Test btn, click me!</button>

      {/*  Main Content  */}
      <Home
        // passing props
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
        topAnime={topAnime}
      />

      <Footer />
    </div>
    </>
  );
}

export default App;
