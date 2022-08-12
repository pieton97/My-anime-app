import "../styles/Header.css";

const Header = () => {
 return (
  <header className="header">
   <div className="header-wrapper">
    <p>My<span className="blue-gradient">Anime</span>App</p>
    <div className="right-header">
      <a href="#result-anchor">Animes</a>
      <a href="#my-list-anchor">myList</a>
    </div>
   </div>
  </header>
 );
};

export default Header;
