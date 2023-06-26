import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import './Pastries.css';
import imagesinfo from '../Imagesdata';
function Pastries() {
  const biscuitsdata=imagesinfo.filter((item) => item.type === 'Pastry');
  return (
    <div>
      <div className='cards'>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 ml-2 p-3'>
          {biscuitsdata.map((biscuitobj) => (
            <div className='col card-items m-2' key={biscuitobj.id}>
              <div className='card-body'>
                <div className='image-body'>
                  <a
                    href={`/price/${biscuitobj.id}?image=${encodeURIComponent(
                      biscuitobj.path
                    )}&price=${encodeURIComponent(biscuitobj.price)}&name=${encodeURIComponent(
                      biscuitobj.name
                    )}&type=${encodeURIComponent(biscuitobj.type)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      className='card-image'
                      src={biscuitobj.path}
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
                <h5>{biscuitobj.name}</h5>
                <p className='fs-5 fw-semibold'>
                  <FaRupeeSign size={17} /> {biscuitobj.price}
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

export default Pastries