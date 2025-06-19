





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CardA.css';

const categories = [
  
  {
    id: 1,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/63588844929054.png',
    category: 'Kids-Wear',
  },
  {
    id: 2,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/63588844994590.png',
    category: 'Indian-Wear',
    
  },
  {
    id: 3,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845060126.png',
    category: 'Styli',
  },
  {
    id: 4,
    image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845191198.png',
    category: 'western-wear',
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

  return (<>
  <div className="carousel__heading">Next-Gen Fashion</div>
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
    </>
  );
};

export default Carousel;





// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import './CardA.css'; // Updated CSS filename

// const items = [
//   { id: 1, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846370846.png' },
//   { id: 2, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846436382.png' },
//   { id: 3, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846501918.png' },
//   { id: 4, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846567454.png' },
//   { id: 5, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846632990.png' },
//   { id: 6, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846698526.png' },
//   { id: 7, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846764062.png' },
//   { id: 8, image: '' },
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
//       <div className="carousel__heading">Watch This Space</div>
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

//         <div className="carousel__buttons">
//           <button onClick={prev} className="carousel__arrow-btn" aria-label="Previous">
//             <ChevronLeft size={20} />
//           </button>
//           <button onClick={next} className="carousel__arrow-btn" aria-label="Next">
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Carousel;
