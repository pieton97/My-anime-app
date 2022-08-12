import "../styles/Header.css";

const Header = () => {
 return (
  <header className="header">
   <div className="header-wrapper">
    <p className="title">MyAnimeApp</p>
    <div className="right-header">
      <a href="#result-anchor">Animes</a>
      <a href="#my-list-anchor">myList</a>
    </div>
   </div>
  </header>
 );
};

export default Header;
