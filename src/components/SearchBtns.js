import React from 'react';
import "../styles/SearchBtns.css";

function SearchBtns(props) {
  return (
    <div className="search-buttons" onClick={props.searchByButton}>
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
      <button value="9">Ecchi</button>
      <button value="49">Erotica</button>
      <button value="35">Harem</button>
      <button value="13">Historical</button>
      <button value="62">Isekai</button>
      <button value="17">Martial Arts</button>
      <button value="18">Mecha</button>
      <button value="19">Music</button>
      <button value="40">Psychological</button>
      <button value="31">Super Power</button>
      <button value="42">Seinen</button>
      <button value="25">Shoujo</button>
      <button value="27">Shounen</button>
    </div>
  )
}

export default SearchBtns
