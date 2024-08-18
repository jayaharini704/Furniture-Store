import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { addProductToCart } from '../redux/cartSlice';

function Home() {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const products = [
    { id: 1, name: 'Sofa', price: 499.99, image: '/images/sofa.jpg' },
    { id: 2, name: 'Chair', price: 149.99, image: '/images/chair.jpg' },
    { id: 3, name: 'Dining Table', price: 299.99, image: '/images/dining_table.jpg' },
  ];

  const handleQuantityChange = (id, quantity) => {
    setQuantities({
      ...quantities,
      [id]: quantity > 0 ? quantity : 1,
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    dispatch(addProductToCart({ ...product, quantity }));
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      <Link to="/cart">Go to Cart</Link> {/* Link to Cart page */}
      {products.map((product) => (
        <li key={product.id} className="product-item">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price.toFixed(2)}</p>
          <div className="quantity-control">
            <input
              type="number"
              value={quantities[product.id] || 1}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
            />
          </div>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
        </li>
      ))}
    </div>
  );
}

export default Home;
