
import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

// Image sources
const images = [

  'https://assets.tatacliq.com/medias/sys_master/images/65244458516510.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244458582046.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244458647582.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244458713118.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244458778654.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244458844190.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244458909726.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244458975262.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244459040798.png',
  'https://assets.tatacliq.com/medias/sys_master/images/65244459106334.png',
  'https://assets.tatacliq.com/medias/sys_master/images/64927656443934.png',

];

// Matching category for each image
const categoryMap = [
  "Styli", "Ethnic-Wear", "Mens-Wear", "Bag",
  "Watches", "Footwear", "Kids-Wear", "Diamond",
  "Beauty",  "Decor", "Skylee"
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      {images.map((src, index) => {
        const categorySlug = categoryMap[index].toLowerCase().replace(/\s+/g, '-');

        return (
          <Link
            to={`/category/${categorySlug}`}
            key={index}
            className="image-card"
          >
            <img src={src} alt={`Category ${index + 1}`} />
          </Link>
        );
      })}
    </div>
  );
};

export default Gallery;

