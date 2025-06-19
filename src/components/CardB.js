









import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CardA.css';

const categories = [
  
  {
    id: 1,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/65236466827294.png',
    category: 'Watches',
  },
  {
    id: 2,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/65236466761758.png',
    category: 'Styli',
  },
  {
    id: 3,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/65236466958366.png',
    category: 'Watches',
  },
  {
    id: 4,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/65236466892830.png',
    category: 'Decor',
  },
  {
    id: 5,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/65236466565150.png',
    category: 'Footwear',
  },
  
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = categories.length;
  const visibleCount = 4;

  const getVisibleItems = () => {
    return Array.from({ length: visibleCount }, (_, i) => {
      const index = (currentIndex + i) % totalItems;
      return categories[index];
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + totalItems) % totalItems
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % totalItems
    );
  };

  return (
    <div className="carousel">
      <div className="carousel__buttons">
        <button onClick={handlePrev} className="carousel__arrow-btn" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button onClick={handleNext} className="carousel__arrow-btn" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="carousel__grid">
        {getVisibleItems().map((item) => (
          <div key={item.id} className="carousel__card active">
            <Link to={`/category/${item.category}`}>
              <img
                src={item.image}
                alt={`${item.category} category`}
                className="carousel__image"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;





















// import React, { useState } from 'react';

// import { ChevronLeft, ChevronRight } from 'lucide-react';

// import './CardA.css'; // Updated CSS filename

// const items = [

//   { id: 1, image: 'https://assets.tatacliq.com/medias/sys_master/images/64002753560606.png' ,link:'/simiar-Products'},
//   { id: 2, image: 'https://assets.tatacliq.com/medias/sys_master/images/64002753626142.png'},
//   { id: 3, image: 'https://assets.tatacliq.com/medias/sys_master/images/64002753691678.png'},
//   { id: 4, image: 'https://assets.tatacliq.com/medias/sys_master/images/64002753822750.png'},
//   { id: 5, image: 'https://assets.tatacliq.com/medias/sys_master/images/64002753888286.png'},
//   { id: 6, image: 'https://assets.tatacliq.com/medias/sys_master/images/64002753953822.png'},
//  {id:7,image:'https://assets.tatacliq.com/medias/sys_master/images/64002754084894.png'},
//   { id: 8, image: 'https://assets.tatacliq.com/medias/sys_master/images/64002754019358.png'},
//   {id:9, image:'https://assets.tatacliq.com/medias/sys_master/images/64002754215966.png'}
// ];
 
// const Carousel = () => {
//   const [startIndex, setStartIndex] = useState(0);

//   const getVisibleItems = () => {
//     return Array.from({ length: 4 }, (_, i) => items[(startIndex + i) % items.length]);
//   };

//   const next = () => {
//     setStartIndex((prev) => (prev + 1) % items.length);
//   };

//   const prev = () => {
//     setStartIndex((prev) => (prev - 1 + items.length) % items.length);
//   };

//   const visibleItems = getVisibleItems();

//   return (
//     <>
//       <div className="carousel__heading">The Westside Store</div>
//       <div className="carousel">
//         <div className="carousel__grid">
//           {visibleItems.map((item) => (
//             <div key={item.id} className="carousel__card">
//               {item.image ? (
//                 <img
//                   src={item.image}
//                   alt={`Item ${item.id}`}
//                   className="carousel__image"
//                 />
//               ) : (
//                 <div className="carousel__placeholder">No Image</div>
//               )}
//             </div>
//           ))}
//         </div>

        
//       </div><div className="carousel__buttons">
//           <button onClick={prev} className="carousel__arrow-btn" aria-label="Previous">
//             <ChevronLeft size={20} />
//           </button>
//           <button onClick={next} className="carousel__arrow-btn" aria-label="Next">
//             <ChevronRight size={20} />
//           </button>
//         </div>
//     </>
//   );
// };

// export default Carousel;
