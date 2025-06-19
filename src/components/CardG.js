

// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import './CardA.css'; // Updated CSS filename

// const items = [
//     { id: 1, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845846558.png' },
//     { id: 2, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845912094.png' },
//     { id: 3, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845977630.png' },
//     { id: 4, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846043166.png' },
//     { id: 5, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846174238.png' },
//     { id: 6, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846239774.png' },
//     { id: 7, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845846558.png' },
//     { id: 8, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845912094.png' },
  
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
//       <div className="carousel__heading">The Digi-pen</div>
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
