import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import './Cupcakes.css';
import imagesinfo from '../Imagesdata';
function Cupcakes() {
  const cupcakesdata=imagesinfo.filter((item) => item.type === 'Cupcake');
  return (
    <div>
      <div className='cards'>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 ml-2 p-3'>
          {cupcakesdata.map((cupcakeobj) => (
            <div className='col card-items m-2' key={cupcakeobj.id}>
              <div className='card-body'>
                <div className='image-body'>
                  <a
                    href={`/price/${cupcakeobj.id}?image=${encodeURIComponent(
                      cupcakeobj.path
                    )}&price=${encodeURIComponent(cupcakeobj.price)}&name=${encodeURIComponent(
                      cupcakeobj.name
                    )}&type=${encodeURIComponent(cupcakeobj.type)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      className='card-image'
                      src={cupcakeobj.path}
                      alt='Card'
                      style={{
                        width: '210px',
                        height: '250px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                  </a>
                </div>
                <h5>{cupcakeobj.name}</h5>
                <p className='fs-5 fw-semibold'>
                  <FaRupeeSign size={17} /> {cupcakeobj.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Cupcakes