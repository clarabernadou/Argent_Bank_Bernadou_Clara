import React from "react";

export default function FeatureItem({ imgSrc, title, description }) {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
