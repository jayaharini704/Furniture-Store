import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../redux/cartSlice';

const products = [
  { id: 1, name: 'Sofa', price: 499.99, image: '/images/sofa.jpg', description: 'A comfortable sofa.' },
  { id: 2, name: 'Chair', price: 149.99, image: '/images/chair.jpg', description: 'A modern chair.' },
  { id: 3, name: 'Dining Table', price: 299.99, image: '/images/dining_table.jpg', description: 'A stylish table.' },
];

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProductToCart({ ...product, quantity: 1 }));
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
