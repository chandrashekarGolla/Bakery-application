
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { HiOutlineShoppingCart ,HiPlus,HiMinus} from "react-icons/hi";

import "./Price.css";

export default function Price() {
  
  const [eggless, setEggless] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(""); 
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
