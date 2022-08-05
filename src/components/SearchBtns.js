import React from 'react';
import "../styles/SearchBtns.css";

function SearchBtns(props) {
  return (
    <div className="search-buttons" onClick={props.searchByButton}>
      <h4>Search by genre:</h4>
      <hr />
      <button value="1">Action</button>
      <button value="2">Adventure</button>
      <button value="4">Comedy</button>
      <button value="8">Drama</button>
      <button value="10">Fantasy</button>
      <button value="26">Girls Love</button>
      <button value="47">Gourmet</button>
      <button value="14">Horror</button>
      <button value="7">Mystery</button>
      <button value="22">Romance</button>
      <button value="24">Sci-Fi</button>
      <button value="36">Slice of Life</button>
      <button value="30">Sports</button>
      <button value="37">Supernatural</button>
      <button value="41">Suspense</button>
      <button value="42">Seinen</button>
      <button value="43">Josei</button>
      <button value="25">Shoujo</button>
      <button value="27">Shounen</button>
      <h4>Search by theme:</h4>
      <hr />
      <button value="62">Isekai</button>
      <button value="9">Ecchi</button>
      <button value="49">Erotica</button>
      <button value="81">CrossDressing</button>
      <button value="39">Detective</button>
      <button value="58">Gore</button>
      <button value="35">Harem</button>
      <button value="59">High Stakes Game</button>
      <button value="13">Historical</button>
      <button value="66">Mahou Shoujo</button>
      <button value="17">Martial Arts</button>
      <button value="18">Mecha</button>
      <button value="19">Music</button>
      <button value="67">Medical</button>
      <button value="38">Military</button>
      <button value="20">Parody</button>
      <button value="40">Psychological</button>
      <button value="71">Pets</button>
      <button value="3">Racing</button>
      <button value="72">Reincarnation</button>
      <button value="21">Samurai</button>
      <button value="23">School</button>
      <button value="11">Strategy Game</button>
      <button value="31">Super Power</button>
      <button value="76">Survival</button>
      <button value="77">Team Sports</button>
      <button value="78">Time Travel</button>
      <button value="32">Vampire</button>
      <button value="79">Video Game</button>
    </div>
  )
}

export default SearchBtns
