import img from './images/cake.jpeg';
import vegimg from './images/veg.png'
import nonvegimg from './images/nonveg.png';
import "./Card.css";

export default function Card() {


    return (

        <div className="cards row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center " >
            <div className="card g-4">
                <img src={vegimg} alt="" className='food-icon' />
                <img src={img} alt="" className='cake-img' />
                <h1>chocolate cake</h1>
                <div className="button-box">
                    <button className="view">view</button>
                </div>
            </div>

            <div className="card g-4 ">
                <img src={nonvegimg} alt="" className='food-icon' />
                <img src={img} alt="" className='cake-img' />
                <h1>chocolate cake</h1>
                <div className="button-box">
                    <button className="view">view</button>
                </div>
            </div>

            <div className="card g-4">
                <img src={vegimg} alt="" className='food-icon' />
                <img src={img} alt="" className='cake-img' />
                <h1>chocolate cake</h1>
                <div className="button-box">
                    <button className="view">view</button>
                </div>
            </div>

            <div className="card g-4">
                <img src={nonvegimg} alt="" className='food-icon' />
                <img src={img} alt="" className='cake-img' />
                <h1>chocolate cake</h1>
                <div className="button-box">
                    <button className="view">view</button>
                </div>
            </div>

        </div>





    )
}

 <div className=' card row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {
          imagesinfo.map((biscuitobj) =>
            <div className='col text-center' key={biscuitobj.id}>
              <div className='card'>
                {/* Image clicking case */}
                <div className='card-body'>
                  <img src={vegimg} alt="" className='food-icon' />
                  <a href={`/price/${biscuitobj.id}?image=${encodeURIComponent(biscuitobj.path)}&price=${encodeURIComponent(biscuitobj.price)}`} target="_blank" rel="noopener noreferrer">
                    <img src={biscuitobj.path} alt="Card" />
                  </a>
                  <p>{biscuitobj.name}</p>
                  <p>{biscuitobj.price}</p>
                  {/* <button  className='btn btn-secondary' onClick={()=>handleButtonClick(biscuitobj)} >Place Order</button> */}
                </div>

              </div>
              <div class="container py-5">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 py-5">
                  {imagesinfo.map((biscuitobj)=>
                  <div class="col" key={biscuitobj.id}>
                    <div class="card">
                      biscuitobj.egg?
                    <img src={vegimg} alt="" className='food-icon' />
                      <a href={`/price/${biscuitobj.id}?image=${encodeURIComponent(biscuitobj.path)}&price=${encodeURIComponent(biscuitobj.price)}`} target="_blank" rel="noopener noreferrer">
                        <img src={biscuitobj.path} alt="Card" />
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">{biscuitobj.name}</h5>
                      </div>
                      <div class="mb-5 d-flex justify-content-around">
                        <h3>₹ {biscuitobj.price}</h3>
                      </div>
                    </div>
                  </div>
                  )}

                </div>
              </div>


            </div>)
        }

      </div>

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PriceComponent = () => {
  const location = useLocation();
  const { image, price } = location.state || {};
  const [weight, setWeight] = useState(250);
  const [isEggless, setIsEggless] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(null);

  if (!image || !price) {
    return <div>No price information available.</div>;
  }

  const handleWeightChange = (selectedWeight) => {
    setWeight(selectedWeight);
  };

  const handleEgglessChange = () => {
    setIsEggless(!isEggless);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDeliveryDate(selectedDate);
  };

  const isDateDeliverable = () => {
    if (!deliveryDate) {
      return false; // Date not selected, so not deliverable
    }

    const currentDate = new Date();
    const selectedDate = new Date(deliveryDate);
    const oneDayAhead = new Date();
    oneDayAhead.setDate(currentDate.getDate() + 1);

    return selectedDate >= oneDayAhead;
  };

  const calculateTotalPrice = () => {
    let totalPrice = price * weight / 250; // Calculate the base price based on weight

    if (isEggless) {
      totalPrice += 200; // Add additional cost for eggless option
    }

    return totalPrice.toFixed(2); // Round the total price to 2 decimal places
  };

  return (
    <div>
      <img src={image} alt="Price" />
      <p>Price: {price} per kg</p>
      <div>
        <p>Select Weight:</p>
        <button
          className={weight === 250 ? 'active' : ''}
          onClick={() => handleWeightChange(250)}
        >
          250g
        </button>
        <button
          className={weight === 500 ? 'active' : ''}
          onClick={() => handleWeightChange(500)}
        >
          500g
        </button>
        <button
          className={weight === 750 ? 'active' : ''}
          onClick={() => handleWeightChange(750)}
        >
          750g
        </button>
        <button
          className={weight === 1000 ? 'active' : ''}
          onClick={() => handleWeightChange(1000)}
        >
          1kg
        </button>
        {/* Add more weight buttons as needed */}
      </div>
      <div>
        <input
          type="checkbox"
          id="eggless-checkbox"
          checked={isEggless}
          onChange={handleEgglessChange}
        />
        <label htmlFor="eggless-checkbox">Eggless (+ Rs 200 per kg)</label>
      </div>
      <div>
        <p>Select Delivery Date:</p>
        <input
          type="date"
          id="delivery-date"
          onChange={handleDateChange}
        />
      </div>
      {isDateDeliverable() ? (
        <p>Total Price: Rs {calculateTotalPrice()}</p>
      ) : (
        <p>Sorry, the selected date is not deliverable.</p>
      )}
    </div>
  );
};

export default PriceComponent;



{/* New tab CAse */ }
{/* <img src={decodeURIComponent(image)} alt="Price" />
                <p>Price: {decodeURIComponent(totalprice)}</p> */}
{/* FinalCase */ }
{/* <h2>{price}</h2>
                <div><img src={image} alt="not availabe" className="image" /></div> */}


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuXwdmxiXU529kX9WHCFc_mKhscIYyxio",
  authDomain: "react-phone-auth-690ad.firebaseapp.com",
  projectId: "react-phone-auth-690ad",
  storageBucket: "react-phone-auth-690ad.appspot.com",
  messagingSenderId: "534157114079",
  appId: "1:534157114079:web:9b8b1c19941655f94c876a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);