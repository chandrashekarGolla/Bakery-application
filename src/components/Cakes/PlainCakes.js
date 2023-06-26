import React from 'react'
import { Outlet } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa';
import './PlainCakes.css';
import imagesinfo from '../Imagesdata';
function PlainCakes() {
  const plaincakesdata=imagesinfo.filter((item) => item.type === 'Cake');
  return (
    <div>
      <div className='cards'>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 ml-2 p-3'>
          {plaincakesdata.map((cakeobj) => (
            <div className='col card-items m-2' key={cakeobj.id}>
              <div className='card-body'>
                <div className='image-body'>
                  <a
                    href={`/price/${cakeobj.id}?image=${encodeURIComponent(
                      cakeobj.path
                    )}&price=${encodeURIComponent(cakeobj.price)}&name=${encodeURIComponent(
                      cakeobj.name
                    )}&type=${encodeURIComponent(cakeobj.type)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      className='card-image'
                      src={cakeobj.path}
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
                <h5>{cakeobj.name}</h5>
                <p className='fs-5 fw-semibold'>
                  <FaRupeeSign size={17} /> {cakeobj.price}
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

export default PlainCakes