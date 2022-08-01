import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";


function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [testApi, setTestApi] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnime(search);
  };

  const buttonSearch = (e) => {
    e.preventDefault();
    fetchAnimeByGenre(e.target.value)
  }

  // Fetching top anime (by popularity) from jikan API
  const getTopAnime = async () => {
    const baseURL = `https://api.jikan.moe/v4/top/anime`;
    const res = await fetch(baseURL)
    const data = await res.json();

    setTopAnime(data.data);
  };

  // Fetching searched anime from jikan API
  const fetchAnime = async (anime_name) => {
    const baseURL = `https://api.jikan.moe/v4/anime?q=${anime_name}&order_by=rank&sort=asc&min_score=4&sfw=true`;
    const res = await fetch(baseURL)
    const data = await res.json();

    setAnimeList(data.data);
    setTopAnime(data.data);
  };

  // Fetching anime by genre from Jikan API
  const fetchAnimeByGenre = async (genreID) => {
    const baseURL = `https://api.jikan.moe/v4/anime?genres=${genreID}&min_score=4&order_by=score&sort=desc&sfw=true`;
    const res = await fetch(baseURL)
    const data = await res.json();

    setAnimeList(data.data);
    setTopAnime(data.data);
  }

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
    const baseURL2 = `https://api.jikan.moe/v4/anime?genres=1&order_by=title&sort=asc&sfw=true`;
    const baseURL3 = `https://api.jikan.moe/v4/genres/anime`;
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

      <Home
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        animeList={animeList}
        topAnime={topAnime}
        buttonSearch={buttonSearch}
      />

      <Footer />
    </div>
    </>
  );
}

export default App;
