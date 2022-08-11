import React from "react";
import "../styles/SearchBtns.css";

function SearchBtns(props) {
 return (
  <div className="search-buttons" onClick={props.searchByButton}>
   <details>
    <summary>Search by genre:</summary>
    <button data-id="1">Action</button>
    <button data-id="2">Adventure</button>
    <button data-id="4">Comedy</button>
    <button data-id="8">Drama</button>
    <button data-id="10">Fantasy</button>
    <button data-id="26">Girls Love</button>
    <button data-id="47">Gourmet</button>
    <button data-id="14">Horror</button>
    <button data-id="7">Mystery</button>
    <button data-id="22">Romance</button>
    <button data-id="24">Sci-Fi</button>
    <button data-id="36">Slice of Life</button>
    <button data-id="30">Sports</button>
    <button data-id="37">Supernatural</button>
    <button data-id="41">Suspense</button>
    <button data-id="42">Seinen</button>
    <button data-id="43">Josei</button>
    <button data-id="25">Shoujo</button>
    <button data-id="27">Shounen</button>
   </details>

   <details>
    <summary>Search by theme:</summary>
    <button data-id="9">Ecchi</button>
    <button data-id="49">Erotica</button>
    <button data-id="81">CrossDressing</button>
    <button data-id="39">Detective</button>
    <button data-id="58">Gore</button>
    <button data-id="62">Isekai</button>
    <button data-id="35">Harem</button>
    <button data-id="59">High Stakes Game</button>
    <button data-id="13">Historical</button>
    <button data-id="66">Mahou Shoujo</button>
    <button data-id="17">Martial Arts</button>
    <button data-id="18">Mecha</button>
    <button data-id="19">Music</button>
    <button data-id="67">Medical</button>
    <button data-id="38">Military</button>
    <button data-id="20">Parody</button>
    <button data-id="40">Psychological</button>
    <button data-id="71">Pets</button>
    <button data-id="3">Racing</button>
    <button data-id="72">Reincarnation</button>
    <button data-id="21">Samurai</button>
    <button data-id="23">School</button>
    <button data-id="11">Strategy Game</button>
    <button data-id="31">Super Power</button>
    <button data-id="76">Survival</button>
    <button data-id="77">Team Sports</button>
    <button data-id="78">Time Travel</button>
    <button data-id="32">Vampire</button>
    <button data-id="79">Video Game</button>
   </details>
  </div>
 );
}

export default SearchBtns;
