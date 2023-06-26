
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { HiOutlineShoppingCart ,HiPlus,HiMinus} from "react-icons/hi";

import "./Price.css";

export default function Price() {
  
  const [eggless, setEggless] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(""); // selected delivery date
  const [itemadded, setItemStatus] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const image = searchParams.get("image");
  const price = searchParams.get("price");
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const initialWeight=getInitialWeight();
  const [weight, setWeight] = useState(initialWeight);
  const [totalPrice, setTotalPrice] = useState(price);

  // const [executeEffect, setExecuteEffect] = useState(false);
  if (!image || !price || !name || !type) {
    return <div>No price information available.</div>;
  }


  // useEffect(() => {
  //   if (executeEffect && itemadded) {
  //     const timer = setTimeout(() => {
  //       setItemStatus(false);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [executeEffect, itemadded]);


  const addToCart = async () => {
    const itemid = Math.floor(Math.random() * 100);
    console.log(itemid);
    try {
      const response = await fetch("http://localhost:3500/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemid, image, price, name }),
      });
      if (response.ok) {
        setItemStatus(true)
        console.log("Item added to cart");
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  function getInitialWeight() {
    switch (type) {
      case "Chocolate":
        return 100;
      case "Biscuit":
        return 250;
      case "Cake":
        return 250;
      case "Icecream":
        return 500;
      case "Pastry":
        return 500;
      case "Cupcake":
        return 2;
      default:
        return 0;
    }
  }
  const handleWeightIncrement = () => {
    let newWeight = weight;
    if (type === "Chocolate") {
        if (newWeight === 100) {
          newWeight = 250;
        } else {
          newWeight += 250;
        }
      }
    else if(type==="Cupcake")
    {
        newWeight+=2;
    }
    else{
        newWeight+=250
    }
    setWeight(newWeight);
    setTotalPrice(calculateTotalPrice(price, newWeight, eggless));
  };

  const handleWeightDecrement = () => {
    let newWeight = weight;
    if (type === "Chocolate") {
      if (newWeight === 250 ||newWeight===100) {
        newWeight = 100;
      } else {
        newWeight -= 250;
      }
    }
    else if(type==="Cupcake"){
        if(newWeight===4 || newWeight===0)
            newWeight=2;
        else
        newWeight-=2;
    }
    else {
      newWeight -= 250;
    }
    setWeight(newWeight);
    setTotalPrice(calculateTotalPrice(price, newWeight, eggless));
  };

  const handleEgglessChange = (event) => {
    setEggless(event.target.checked);
    setTotalPrice(calculateTotalPrice(price, weight, event.target.checked));
  };

  const handleDeliveryDateChange = (event) => {
    setDeliveryDate(event.target.value);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  let minDeliveryDate = new Date();
  if (type === "Cake" || type === "Pastry") {
    minDeliveryDate.setDate(minDeliveryDate.getDate() + 2);
  } else {
    minDeliveryDate.setDate(minDeliveryDate.getDate() + 1);
  }

  const calculateTotalPrice = (price, weight, eggless = false) => {
    let totalPrice = Math.ceil((price) * (weight)/initialWeight);
    if (eggless) {
      totalPrice += 20;
    }
    return totalPrice;
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-4 p-3 mt-3">
              <img
                src={image} alt="not available" className="image p-0 w-100"
                style={{
                  width: "300px",height: "300px", objectFit: "cover",   borderRadius: "10px",
                }}
              />
            </div>
            <div className="col-sm-8 ">
              <h5 className="fs-2 p-2">{name}</h5>
              {type === "Chocolate" && (
                <div>
                <p className="fs-6 fw-bold p-2">Select Weight</p>
                <div className="weight-control ">
                  <button className="weight-btn " onClick={handleWeightDecrement}>
                    <HiMinus />
                  </button>
                  <span className="weight-border">{weight}g</span>
                  <button className="weight-btn" onClick={handleWeightIncrement}>
                    <HiPlus />
                  </button>
                </div>
              </div>
                // <div>
                //   <p>Select Weight</p>
                //   <button
                //     onClick={() => handleWeightChange(100)}
                //     className="btn"
                //   >
                //     100g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(250)}
                //     className="btn"
                //   >
                //     250g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(500)}
                //     className="btn"
                //   >
                //     500g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(750)}
                //     className="btn"
                //   >
                //     750g
                //   </button>
                //   {/* Add more weight options here */}
                // </div>
              )}

              {type === "Biscuit" && name === "Chocolate Cookie" && (
                <div>
                <p className="fs-6 fw-bold p-2">Select Weight</p>
                <div className="weight-control p-2">
                  <button className="weight-btn" onClick={handleWeightDecrement}>
                    <HiMinus />
                  </button>
                  <span className="weight-border">{weight}g</span>
                  <button className="weight-btn" onClick={handleWeightIncrement}>
                    <HiPlus />
                  </button>
                  
                </div>
                <div className="p-2">
                    <input 
                      type="checkbox"
                      id="eggless"
                      checked={eggless}
                      onChange={handleEgglessChange}
                    />
                    <label htmlFor="eggless">Egg</label>
                  </div>
              </div>
                // <div>
                //   <p>Select Weight</p>
                //   <button
                //     onClick={() => handleWeightChange(250)}
                //     className="btn"
                //   >
                //     250g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(500)}
                //     className="btn"
                //   >
                //     500g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(750)}
                //     className="btn"
                //   >
                //     750g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(1000)}
                //     className="btn"
                //   >
                //     1kg
                //   </button>
                //   {/* Add more weight options here */}
                //   <div>
                //     <input
                //       type="checkbox"
                //       id="eggless"
                //       checked={eggless}
                //       onChange={handleEgglessChange}
                //     />
                //     <label htmlFor="eggless">Egg</label>
                //   </div>
                // </div>
              )}

              {type === "Biscuit" && name !== "Chocolate Cookie" && (
                <div>
                <p className="fs-6 fw-bold p-2">Select Weight</p>
                <div className="weight-control p-2">
                  <button className="weight-btn" onClick={handleWeightDecrement}>
                    <HiMinus />
                  </button>
                  <span className="weight-border">{weight}g</span>
                  <button className="weight-btn" onClick={handleWeightIncrement}>
                    <HiPlus />
                  </button>
                </div>
              </div>
                // <div>
                //   <p>Select Weight</p>
                //   <button
                //     onClick={() => handleWeightChange(250)}
                //     className="btn"
                //   >
                //     250g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(500)}
                //     className="btn"
                //   >
                //     500g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(750)}
                //     className="btn"
                //   >
                //      750g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(1000)}
                //     className="btn"
                //   >
                //     1kg
                //   </button>
                //   {/* Add more weight options here */}
                // </div>
              )}

              {type === "Cake" && (
                <div>
                <p className="fs-6 fw-bold p-2">Select Weight</p>
                <div className="weight-control p-2">
                  <button className="weight-btn" onClick={handleWeightDecrement}>
                    <HiMinus />
                  </button>
                  <span className="weight-border">{weight}g</span>
                  <button className="weight-btn" onClick={handleWeightIncrement}>
                    <HiPlus />
                  </button>
                  
                </div>
                <div className="p-2">
                     <input
                      type="checkbox"
                      id="eggless"
                      checked={eggless}
                      onChange={handleEgglessChange}
                    />
                    <label htmlFor="eggless">Eggless</label>
                  </div>
              </div>
                // <div>
                //   <p>Select Weight</p>
                //   <button
                //     onClick={() => handleWeightChange(250)}
                //     className="btn"
                //   >
                //     250g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(500)}
                //     className="btn"
                //   >
                //     500g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(750)}
                //     className="btn"
                //   >
                //     750g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(1000)}
                //     className="btn"
                //   >
                //     1kg
                //   </button>
                //   {/* Add more weight options here */}
                //   <div>
                //     <input
                //       type="checkbox"
                //       id="eggless"
                //       checked={eggless}
                //       onChange={handleEgglessChange}
                //     />
                //     <label htmlFor="eggless">Eggless</label>
                //   </div>
                // </div>
              )}

              {type === "Icecream" && (
                <div>
                <p className="fs-6 fw-bold p-2">Select Weight</p>
                <div className="weight-control p-2">
                  <button className="weight-btn" onClick={handleWeightDecrement}>
                    <HiMinus />
                  </button>
                  <span className="weight-border">{weight}g</span>
                  <button className="weight-btn" onClick={handleWeightIncrement}>
                    <HiPlus />
                  </button>
                </div>
              </div>
                // <div>
                //   <p>Select Weight</p>
                //   <button
                //     onClick={() => handleWeightChange(500)}
                //     className="btn"
                //   >
                //     500g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(750)}
                //     className="btn"
                //   >
                //     750g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(1000)}
                //     className="btn"
                //   >
                //     1kg
                //   </button>
                //   {/* Add more weight options here */}
                // </div>
              )}

              {type === "Pastry" && (
                <div>
                <p className="fs-6 fw-bold p-2">Select Weight</p>
                <div className="weight-control p-2">
                  <button className="weight-btn" onClick={handleWeightDecrement}>
                    <HiMinus />
                  </button>
                  <span className="weight-border">{weight}g</span>
                  <button className="weight-btn" onClick={handleWeightIncrement}>
                    <HiPlus />
                  </button>
                </div>
                   <div className="p-2">
                     <input
                      type="checkbox"
                      id="eggless"
                      checked={eggless}
                      onChange={handleEgglessChange}
                    />
                    <label htmlFor="eggless">Eggless</label>
                   </div>
              </div>
                // <div>
                //   <p>Select Weight</p>
                //   <button
                //     onClick={() => handleWeightChange(500)}
                //     className="btn"
                //   >
                //     500g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(750)}
                //     className="btn"
                //   >
                //     750g
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(1000)}
                //     className="btn"
                //   >
                //     1kg
                //   </button>
                //   {/* Add more weight options here */}
                //   <div>
                //     <input
                //       type="checkbox"
                //       id="eggless"
                //       checked={eggless}
                //       onChange={handleEgglessChange}
                //     />
                //     <label htmlFor="eggless">Eggless</label>
                //   </div>
                // </div>
              )}

              {type === "Cupcake" && (
                <div>
                <p className="fs-6 fw-bold">Select Weight</p>
                <div className="weight-control p-2">
                  <button className="weight-btn" onClick={handleWeightDecrement}>
                    <HiMinus />
                  </button>
                  <span className="weight-border">{weight}</span>
                  <button className="weight-btn" onClick={handleWeightIncrement}>
                    <HiPlus />
                  </button>
                </div>
                <div className="p-2">
                    <input
                      type="checkbox"
                      id="eggless"
                      checked={eggless}
                      onChange={handleEgglessChange}
                    />
                    <label htmlFor="eggless">Eggless</label>
                  </div>
              </div>
                // <div>
                //   <p>Select Quantity</p>
                //   <button
                //     onClick={() => handleWeightChange(4)}
                //     className="btn"
                //   >
                //     4
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(6)}
                //     className="btn"
                //   >
                //     6
                //   </button>
                //   <button
                //     onClick={() => handleWeightChange(12)}
                //     className="btn"
                //   >
                //     12
                //   </button>
                //   {/* Add more quantity options here */}
                //   <div>
                //     <input
                //       type="checkbox"
                //       id="eggless"
                //       checked={eggless}
                //       onChange={handleEgglessChange}
                //     />
                //     <label htmlFor="eggless">Eggless</label>
                //   </div>
                // </div>
              )}

              <div className="delivery p-2">
                <p  className="fs-6 fw-bold">Select Delivery Date</p>
                <input 
                  type="date"
                  min={formatDate(minDeliveryDate)}
                  value={deliveryDate}
                  onChange={handleDeliveryDateChange}
                />
                {deliveryDate && new Date(deliveryDate) < minDeliveryDate && (
                  <p className="text-danger">*Please choose a delivery date after {formatDate(minDeliveryDate)}.</p>
                )}
              </div>
              <div>
                <h4 className="fs-5 fw-semibold p-2">
                  Total Price: <FaRupeeSign size={15}/>{totalPrice}
                </h4>
              </div>
              <div className="bottom-btn p-2">
              <button className="btn cart-btn" onClick={addToCart}>
                  <HiOutlineShoppingCart /> Add to Cart
                </button>
                <button className="btn buy-btn ">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        {itemadded && (
        <div className="popup">
          <p>Item added to cart!</p>
        </div>
      )}
      </div>
      <Outlet />
    </div>
  );
}



























// import React, { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { FaRupeeSign } from "react-icons/fa";
// import { HiOutlineShoppingCart } from 'react-icons/hi'
// import './Price.css'

// export default function Price() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const image = searchParams.get('image');
//   const price = searchParams.get('price');
//   const name = searchParams.get('name');
//   const type = searchParams.get('type');

//   const [weight, setWeight] = useState(100);
//   const [totalPrice, setTotalPrice] = useState(parseFloat(price) || 0);
//   const [deliveryDate, setDeliveryDate] = useState("");

//   const increaseWeight = () => {
//     setWeight(prevWeight => prevWeight + 250);
//     calculatePrice(weight + 250);
//   };
  
//   const decreaseWeight = () => {
//     if (weight > 100) {
//       setWeight(prevWeight => prevWeight - 250);
//       calculatePrice(weight - 250);
//     }
//   };
  

//   const calculatePrice = (weight) => {
//     const parsedPrice = parseFloat(price);
//     const calculatedPrice = parsedPrice * (weight / 1000);
//     setTotalPrice(calculatedPrice);
//   };

//   const handleDateChange = (event) => {
//     const selectedDate = event.target.value;
//     const minDate = getMinDeliveryDate();
//     if (selectedDate >= minDate) {
//       setDeliveryDate(selectedDate);
//     } else {
//       setDeliveryDate("");
//       alert("Delivery date should start from " + minDate);
//     }
//   };

//   const handleAddToCart = () => {
//     // Add the selected item to the cart
//     // Implementation logic goes here
//   };

//   const handleBuyNow = () => {
//     // Proceed with the buying process
//     // Implementation logic goes here
//   };

//   const getMinDeliveryDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 1);
//     const minDate = today.toISOString().split("T")[0];
//     return minDate;
//   };

//   if (type === 'Chocolate') {
//     return (
//       <div className="container">
//         <div className="card">
//           <div className="card-body">
//             <div className="row">
//               <div className="col-sm-4">
//                 <img src={image} alt="not available" className="image p-0 w-100" style={{
//                   width: '300px',
//                   height: '300px',
//                   objectFit: 'cover',
//                   borderRadius: '10px',
//                 }} />
//               </div>
//               <div className="col-sm-8">
//                 <h5 className="fs-2">{name}</h5>
//                 <div className="buttons">
//                   <p className="fs-4 fw-semibold">Select Weight</p>
//                   <div className="weight-controls">
//                     <button className="btn" onClick={decreaseWeight}>-</button>
//                     <span>{weight}g</span>
//                     <button className="btn" onClick={increaseWeight}>+</button>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="fs-2 fw-semibold">
//                     <FaRupeeSign size={28} />
//                     {totalPrice.toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="delivery-date">
//                   <p className="fs-4 fw-semibold">Select Delivery Date</p>
//                   <label htmlFor="deliveryDate">Delivery Date:</label>
//                   <input
//                     type="date"
//                     id="deliveryDate"
//                     value={deliveryDate}
//                     onChange={handleDateChange}
//                     min={getMinDeliveryDate()}
//                   />
//                 </div>
//                 <div className="bottom-btn">
//                   <button className="btn cart-btn fw-bold w-25" onClick={handleAddToCart}>
//                     <HiOutlineShoppingCart size={25} /> Add To Cart
//                   </button>
//                   <button className="btn buy-btn fw-bold w-25" onClick={handleBuyNow}>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Outlet />
//       </div>
//     );
//   } else {
//     return <div>No price information available.</div>;
//   }
// }


// export default function Price() {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const image = searchParams.get('image');
//     const price = searchParams.get('price');
//     const name = searchParams.get('name');
//     const type = searchParams.get('type');
//     const [weight, setWeight] = useState(250);
//     const [quantity, setQuantity] = useState(4);
//     const [isEggless, setIsEggless] = useState(false);
//     const [deliveryDate, setDeliveryDate] = useState('');
  
//     const handleWeightIncrement = () => {
//       setWeight(prevWeight => prevWeight + 250);
//     };
  
//     const handleWeightDecrement = () => {
//       if (weight > 250) {
//         setWeight(prevWeight => prevWeight - 250);
//       }
//     };
  
//     const handleQuantityIncrement = () => {
//       setQuantity(prevQuantity => prevQuantity + 2);
//     };
  
//     const handleQuantityDecrement = () => {
//       if (quantity > 4) {
//         setQuantity(prevQuantity => prevQuantity - 2);
//       }
//     };
  
//     const handleEgglessChange = () => {
//       setIsEggless(prevIsEggless => !prevIsEggless);
//     };
  
//     const handleDeliveryDateChange = (event) => {
//       setDeliveryDate(event.target.value);
//     };
  
//     const calculateTotalPrice = () => {
//       let totalPrice = parseFloat(price);
  
//       if (type === 'chocolate') {
//         totalPrice *= weight / 100;
//       } else if (type === 'biscuit') {
//         totalPrice *= weight / 250;
//       } else if (type === 'cake') {
//         totalPrice *= weight / 250;
//         if (isEggless) {
//           totalPrice += 200;
//         }
//       } else if (type === 'icecream' || type === 'pastry') {
//         totalPrice *= weight / 500;
//       } else if (type === 'cupcake') {
//         totalPrice *= quantity / 4;
//         if (isEggless) {
//           totalPrice += 15 * quantity;
//         }
//       }
  
//       return totalPrice.toFixed(2);
//     };
  
//     const totalPrice = calculateTotalPrice();
  
//     const deliveryDateOptions = (() => {
//       // Add your delivery date options here
//       const options = [];
//       const currentDate = new Date();
//       const oneDayInMs = 24 * 60 * 60 * 1000; // One day in milliseconds
  
//       for (let i = 0; i < 7; i++) {
//         const deliveryDate = new Date(currentDate.getTime() + (i + 1) * oneDayInMs);
//         const formattedDate = deliveryDate.toLocaleDateString();
//         options.push(
//           <option key={formattedDate} value={formattedDate}>{formattedDate}</option>
//         );
//       }
  
//       return options;
//     })();
  
//     return (
//       <div className="container">
//         <div className="card">
//           <div className="card-body">
//             <div className="row">
//               <div className="col-sm-4">
//                 <img
//                   src={image}
//                   alt="not availabe"
//                   className="image p-0 w-100"
//                   style={{
//                     width: '300px',
//                     height: '300px',
//                     objectFit: 'cover',
//                     borderRadius: '10px',
//                   }}
//                 />
//               </div>
//               <div className="col-sm-8">
//                 <h5 className="fs-2">{name}</h5>
//                 {type === 'chocolate' && (
//                   <div className="buttons">
//                     <p className="fs-4 fw-semibold">Select Weight</p>
//                     <button onClick={handleWeightDecrement} className="btn">
//                       -
//                     </button>
//                     <span className="weight">{weight}g</span>
//                     <button onClick={handleWeightIncrement} className="btn">
//                       +
//                     </button>
//                   </div>
//                 )}
//                 {type === 'biscuit' && (
//                   <div className="buttons">
//                     <p className="fs-4 fw-semibold">Select Weight</p>
//                     <button onClick={handleWeightDecrement} className="btn">
//                       -
//                     </button>
//                     <span className="weight">{weight}g</span>
//                     <button onClick={handleWeightIncrement} className="btn">
//                       +
//                     </button>
//                   </div>
//                 )}
//                 {type === 'cake' && (
//                   <div className="buttons">
//                     <p className="fs-4 fw-semibold">Select Weight</p>
//                     <button onClick={handleWeightDecrement} className="btn">
//                       -
//                     </button>
//                     <span className="weight">{weight}g</span>
//                     <button onClick={handleWeightIncrement} className="btn">
//                       +
//                     </button>
//                     <div className="form-check mt-3">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="egglessCheckbox"
//                         checked={isEggless}
//                         onChange={handleEgglessChange}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="egglessCheckbox"
//                       >
//                         Eggless
//                       </label>
//                     </div>
//                   </div>
//                 )}
//                 {type === 'icecream' && (
//                   <div className="buttons">
//                     <p className="fs-4 fw-semibold">Select Weight</p>
//                     <button onClick={handleWeightDecrement} className="btn">
//                       -
//                     </button>
//                     <span className="weight">{weight}g</span>
//                     <button onClick={handleWeightIncrement} className="btn">
//                       +
//                     </button>
//                   </div>
//                 )}
//                 {type === 'pastry' && (
//                   <div className="buttons">
//                     <p className="fs-4 fw-semibold">Select Weight</p>
//                     <button onClick={handleWeightDecrement} className="btn">
//                       -
//                     </button>
//                     <span className="weight">{weight}g</span>
//                     <button onClick={handleWeightIncrement} className="btn">
//                       +
//                     </button>
//                     <div className="form-check mt-3">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="egglessCheckbox"
//                         checked={isEggless}
//                         onChange={handleEgglessChange}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="egglessCheckbox"
//                       >
//                         Eggless
//                       </label>
//                     </div>
//                   </div>
//                 )}
//                 {type === 'cupcake' && (
//                   <div className="buttons">
//                     <p className="fs-4 fw-semibold">Select Quantity</p>
//                     <button onClick={handleQuantityDecrement} className="btn">
//                       -
//                     </button>
//                     <span className="quantity">{quantity}</span>
//                     <button onClick={handleQuantityIncrement} className="btn">
//                       +
//                     </button>
//                     <div className="form-check mt-3">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="egglessCheckbox"
//                         checked={isEggless}
//                         onChange={handleEgglessChange}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="egglessCheckbox"
//                       >
//                         Eggless
//                       </label>
//                     </div>
//                   </div>
//                 )}
//                 <div>
//                   <p className="fs-2 fw-semibold">
//                     <FaRupeeSign size={28} />
//                     {totalPrice}
//                   </p>
//                 </div>
//                 {type === 'chocolate' && (
//                   <div className="form-group">
//                     <label htmlFor="deliveryDate">Select Delivery Date</label>
//                     <select
//                       id="deliveryDate"
//                       className="form-control"
//                       value={deliveryDate}
//                       onChange={handleDeliveryDateChange}
//                     >
//                       <option value="">Select</option>
//                       {deliveryDateOptions}
//                     </select>
//                   </div>
//                 )}
//                 {type === 'biscuit' && (
//                   <div className="form-group">
//                     <label htmlFor="deliveryDate">Select Delivery Date</label>
//                     <select
//                       id="deliveryDate"
//                       className="form-control"
//                       value={deliveryDate}
//                       onChange={handleDeliveryDateChange}
//                     >
//                       <option value="">Select</option>
//                       {deliveryDateOptions}
//                     </select>
//                   </div>
//                 )}
//                 {type === 'cake' && (
//                   <div className="form-group">
//                     <label htmlFor="deliveryDate">Select Delivery Date</label>
//                     <select
//                       id="deliveryDate"
//                       className="form-control"
//                       value={deliveryDate}
//                       onChange={handleDeliveryDateChange}
//                     >
//                       <option value="">Select</option>
//                       {deliveryDateOptions}
//                     </select>
//                   </div>
//                 )}
//                 {type === 'icecream' && (
//                   <div className="form-group">
//                     <label htmlFor="deliveryDate">Select Delivery Date</label>
//                     <select
//                       id="deliveryDate"
//                       className="form-control"
//                       value={deliveryDate}
//                       onChange={handleDeliveryDateChange}
//                     >
//                       <option value="">Select</option>
//                       {deliveryDateOptions}
//                     </select>
//                   </div>
//                 )}
//                 {type === 'pastry' && (
//                   <div className="form-group">
//                     <label htmlFor="deliveryDate">Select Delivery Date</label>
//                     <select
//                       id="deliveryDate"
//                       className="form-control"
//                       value={deliveryDate}
//                       onChange={handleDeliveryDateChange}
//                     >
//                       <option value="">Select</option>
//                       {deliveryDateOptions}
//                     </select>
//                   </div>
//                 )}
//                 {type === 'cupcake' && (
//                   <div className="form-group">
//                     <label htmlFor="deliveryDate">Select Delivery Date</label>
//                     <select
//                       id="deliveryDate"
//                       className="form-control"
//                       value={deliveryDate}
//                       onChange={handleDeliveryDateChange}
//                     >
//                       <option value="">Select</option>
//                       {deliveryDateOptions}
//                     </select>
//                   </div>
//                 )}
//                 <div className="bottom-btn">
//                   <button className="btn cart-btn fw-bold w-25">
//                     <HiOutlineShoppingCart size={25} /> Add To Cart
//                   </button>
//                   <button className="btn buy-btn fw-bold w-25">Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Outlet />
//       </div>
//     );
//   }

  


//this works for finalcase
    //     const location = useLocation();
    //   const { image, price } = location.state||{};

    //this works for new tab
    // const [image, setImage] = useState('');
    // let [totalprice, setPrice] = useState(0);
    //   const [price, setPrice] = useState('');

    //this works for new tab
    //   useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     setImage(urlParams.get('image') || '');
    //     setPrice(urlParams.get('price') || '');
    //   }, []);

    //   if (!image || !totalprice) {
    //     return <div>No price information available.</div>;
    //   }

    //image clicking case
    // useEffect(() => {
    //     // Retrieve the image and price from the query string props
    //     const searchParams = new URLSearchParams(window.location.search);
    //     const image = searchParams.get('image');
    //     const price = searchParams.get('price');

    //     // Do any additional processing with the props as needed
    //     // ...

    //     // Example calculation using a constant cost
    //     const cost = 120;
    //     const newPrice = cost * 1; // Assuming a default weight of 1
    //     setPrice(newPrice);
    //   }, []);

    //this works for finalCase
    // if (!image || !totalprice) {
    //     // Handle the case when the state is null or missing image/price
    //     return <div>No price information available.</div>;
    //   }
    //<div>
    //             <img src={image} alt="Price" />
    //             <p>Price: {price} per kg</p>
    //             <p>{name}</p>
    //             <div>
    //                 <p>Select Weight:</p>
    //                 <button
    //                     className={weight === 250 ? 'active' : ''}
    //                     onClick={() => handleWeightChange(250)}
    //                 >
    //                     250g
    //                 </button>
    //                 <button
    //                     className={weight === 500 ? 'active' : ''}
    //                     onClick={() => handleWeightChange(500)}
    //                 >
    //                     500g
    //                 </button>
    //                 <button
    //                     className={weight === 750 ? 'active' : ''}
    //                     onClick={() => handleWeightChange(750)}
    //                 >
    //                     750g
    //                 </button>
    //                 <button
    //                     className={weight === 1000 ? 'active' : ''}
    //                     onClick={() => handleWeightChange(1000)}
    //                 >
    //                     1kg
    //                 </button>
    //                 {/* Add more weight buttons as needed */}
    //             </div>
    //             <div>
    //                 <input
    //                     type="checkbox"
    //                     id="eggless-checkbox"
    //                     checked={isEggless}
    //                     onChange={handleEgglessChange}
    //                 />
    //                 <label htmlFor="eggless-checkbox">Eggless (+ Rs 200 per kg)</label>
    //             </div>
    //             <div>
    //                 <p>Select Delivery Date:</p>
    //                 <input
    //                     type="date"
    //                     id="delivery-date"
    //                     onChange={handleDateChange}
    //                 />
    //             </div>
    //             {isDateDeliverable() ? (
    //                 <p>Total Price: Rs {calculateTotalPrice()}</p>
    //             ) : (
    //                 <p>Sorry, the selected date is not deliverable.</p>
    //             )}
    //         </div>


