import React, { useState } from "react";
import "../styles/Gallery.css";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { src: "/images/g_-3.jpg", className: "vertical" },
    { src: "/images/g_-4.jpg", className: "vertical" },
    { src: "/images/g_-5.jpg", className: "horizontal" },
    { src: "/images/g_-6.jpg", className: "horizontal" },
    { src: "/images/g_-5.jpg", className: "horizontal" },
    { src: "/images/g_-6.jpg", className: "horizontal" },
    { src: "/images/g_-3.jpg", className: "vertical" },
    { src: "/images/g_-4.jpg", className: "vertical" },
  ];

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="gallery-container">
      <div className="pageheadmain">
        <h1 className="pagehead">Gallery</h1>
        <p className="pagesubhead">Explore our visual journey</p>
      </div>
      
      <div className="masonry-gallery">
        {images.map((image, index) => (
          <div key={index} className={`gallery-item ${image.className}`}>
            <img 
              src={image.src} 
              alt={`Gallery item ${index + 1}`} 
              className="gallery-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <button 
                className="view-button"
                onClick={() => openModal(image.src)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Fullscreen" 
              className="fullscreen-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;