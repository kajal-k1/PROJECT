

import React, { useState } from 'react';

const SortDropdown = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSortOption(selected);

    // Map display value to actual sort key
    let sortKey = '';
    switch (selected) {
      case 'Price Low to High':
        sortKey = 'lowToHigh';
        break;
      case 'Price High to Low':
        sortKey = 'highToLow';
        break;
      case 'Discounts':
        sortKey = 'discounts';
        break;
      case 'New Arrivals':
        sortKey = 'newArrivals';
        break;
      default:
        sortKey = '';
    }

    onSortChange(sortKey);
  };

  return (
    <div className="sort-dropdown" style={{ marginBottom: '1rem' }}>
      <label className="mr-2 font-semibold text-gray-600">Sort by:</label>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="border rounded px-2 py-1"
      >
        <option value="">Popularity</option>
        <option value="Price Low to High">Price Low to High</option>
        <option value="Price High to Low">Price High to Low</option>
        <option value="New Arrivals">New Arrivals</option>
        <option value="Discounts">Discounts</option>
      </select>
    </div>
  );
};

export default SortDropdown;


//  // SortDropdown.jsx
//  import React, { useState } from 'react';

//  const SortDropdown = ({ onSortChange }) => {
//    const [sortOption, setSortOption] = useState('Popularity');

//    const handleSortChange = (e) => {
//      const selected = e.target.value;
//      setSortOption(selected);
//      onSortChange(selected);
//    };

//    return (
//      <div className="sort-dropdown" style={{ marginBottom: '1rem' }}>
//        <label className="mr-2 font-semibold text-gray-600">Sort by:</label>
//        <select
//          value={sortOption}
//         onChange={handleSortChange}
//          className="border rounded px-2 py-1"
//        >
//          <option>Popularity</option>
//          <option>Price Low to High</option>
//         <option>Price High to Low</option>
//         <option>New Arrivals</option>
//          <option>Discounts</option>
//        </select>    
//         </div>
//    );
//  };

//  export default SortDropdown;










// // import React, { useState } from 'react';

// // const SortDropdown = ({ onSortChange }) => {
// //   const [sortOption, setSortOption] = useState('Popularity');

// //   const handleSortChange = (e) => {
// //     const selected = e.target.value;
// //     setSortOption(selected);
// //     onSortChange(selected);
// //   };

// //   return (
// //     <div className="p-4">
// //       <label className="mr-2 font-semibold text-gray-600">Sort by:</label>
// //       <select value={sortOption} onChange={handleSortChange} className="border rounded px-2 py-1">
// //         <option>Popularity</option>
// //         <option>Price Low to High</option>
// //         <option>Price High to Low</option>
// //         <option>New Arrivals</option>
// //         <option>Discounts</option>
// //       </select>
// //     </div>
// //   );
// // };

// // export default SortDropdown;
