import React, { useState, useEffect } from "react";
import "../styles/imgModal.css";
import OpenSingleImg from "./OpenSingleImg";

const OpenImgModal = ({ setImgModal, mal_id }) => {
 const [modalImages, setModalImages] = useState([]);
 const [imgIsOpen, setImgIsOpen] = useState(false);
 const [imgSrc, setImgSrc] = useState("");

 const openImg = (e) => {
  if (e.target.nodeName === "IMG") {
   setImgSrc(e.target.src);
   setImgIsOpen(true);
  };
 };

 // fetch anime images once when modal opens from jikan api
 useEffect(() => {
  const fetchImages = async () => {
   const baseURL = `https://api.jikan.moe/v4/anime/${mal_id}/pictures`;
   const res = await fetch(baseURL);
   const data = await res.json();

   console.log(data.data);
   setModalImages(data.data);
  };
  fetchImages();
  console.log("loaded images");
 }, [mal_id]);

 return (
  <div className="img-modal-background" onClick={(e) => e.stopPropagation()}>
     {imgIsOpen && (
      <OpenSingleImg setImgIsOpen={setImgIsOpen} imgSrc={imgSrc} />
     )}
   <div className="close-container" onClick={() => setImgModal(false)}>
    <div className="img-modal" onClick={(e) => e.stopPropagation()}>
     <p>total images: {modalImages && modalImages.length}</p>
     <div className="img-box-wrapper" onClick={openImg}>
      {modalImages.map((img) => {
       const image = img.webp.large_image_url;
       return (
        <div className="img-box" key={image}>
         <img src={image} alt="no img"></img>
        </div>
       );
      })}
     </div>
     <button onClick={() => setImgModal(false)}>Close modal</button>
    </div>
   </div>
  </div>
 );
};

export default OpenImgModal;
