import { useState, useEffect } from 'react';
import './CartItems.css'
import {MdRemoveShoppingCart} from 'react-icons/md'
import { FaRupeeSign } from "react-icons/fa";
export default function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3500/get-cartItems')
      .then((response) => response.json())
      .then((data) => {
        console.log("json data")
        console.log(data)
        setCartItems(data);

      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const handleDeleteItem = (itemId) => {
    console.log(itemId)
    fetch(`http://localhost:3500/cart/${encodeURIComponent(itemId)}`, {
      method: 'DELETE',
    })
      .then((response) => {
        

        if (response.ok) {
          // Refresh cart items after deletion
          fetch('http://localhost:3500/get-cartItems')
            .then((response) => response.json())
            .then((data) => {
              setCartItems(data);
              console.log("item deletd")
            })
            .catch((error) => {
              console.error('Error fetching cart items:', error);
            });
        } else {
          throw new Error('Failed to delete cart item');
        }
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
      });
  };

  return (
    <div className='container'>
      <h3 className='text-center'>Cart Items</h3>
      <div className='cart-items'>
      {cartItems.map((item) => (
        <div key={item._id} className='items'>
          <img  src={item.image} alt="not available" style={{ width: '50px' }} />
          <p>{item.name}</p>
          <p className='fs-6'>Cost:<FaRupeeSign size={15}/>{item.price}</p>
          <button className='btn btn-danger'  onClick={() => handleDeleteItem(item.itemid)}>< MdRemoveShoppingCart/> Remove</button>
        </div>
      ))}
    </div>
    </div>
    
  );
}
