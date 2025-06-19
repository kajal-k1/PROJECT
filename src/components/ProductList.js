
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="no-products">No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((item) => (
        <ProductCard key={item.id} item={item} /> // use id as key here
      ))}
    </div>
  );
};

export default ProductList;



  //  import React from 'react';
  //  import ProductCard from './ProductCard';
  // import './ProductList.css'; // CSS styles below

  //  const ProductList = ({ products }) => {
  //    if (!products || products.length === 0) {
  //      return <p className="no-products">No products found.</p>;
  //    }

  //    return (
  //      <div className="product-grid">
  //        {products.map((item) => (
  //         <ProductCard key={item.id} item={item} />
  //        ))}
  //     </div>
  //   );
  // };

  //  export default ProductList;

