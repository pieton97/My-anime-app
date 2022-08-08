import React from "react";
import "../styles/single-img.css";

const OpenSingleImg = ({ setImgIsOpen, imgSrc }) => {
 return (
  <div className="single-img-wrapper" onClick={() => setImgIsOpen(false)}>
   <div className="single-img-modal">
    <img src={imgSrc} alt="clicked anime img" />
   </div>
  </div>
 );
};

export default OpenSingleImg;
