import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { removeProductFromCart, updateQuantity } from '../redux/cartSlice';
import './Cart.css';

function Cart() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = id => {
    dispatch(removeProductFromCart({ id }));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <Link to="/">Back to Home</Link> {/* Link to Home page */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemove(item.id)} className="remove-button">Remove</button>
            </div>
          ))}
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
          <button className="checkout-button">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
