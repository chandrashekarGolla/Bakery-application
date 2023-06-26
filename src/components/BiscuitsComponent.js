import React from 'react';
import { Link } from 'react-router-dom';
import AlmondCookie from './Images/AlmondCookie.jpeg'
import Karachi from './Images/Karachi.jpeg'
import NutellaCookie from './Images/NutellaCookie.jpeg'
import Brookie from './Images/Brookie.jpeg'
// import nonvegicon from './Images/nonvegicon.jpeg'
// import vegicon from './Images/vegicon.jpeg'
import './BiscuitComponent.css'

const ImageComponent = ({ src, alt, destination }) => {
  return (
    <Link to={destination} className='cards'>
      <img src={src} alt={alt} />
    </Link>
  );
};

const ImagesContainer = () => {
  const images = [
    { id: 1, src: AlmondCookie, alt: 'Image 1', destination: '/biscuits/almondCookies' },
    { id: 2, src: Karachi, alt: 'Image 2', destination: '/biscuits/karachiCookies' },
    { id: 3, src: NutellaCookie, alt: 'Image 3', destination: '/biscuits/nutellaCookies' },
    { id: 4, src: Brookie, alt: 'Image 4', destination: '/biscuits/brookies' }

  ];

  return (
    // <div>
    //   <div className="cards row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center " >
    //     <div className="card g-4">
    //       <img src={vegicon} alt="" className='food-icon' />
    //       <h1>chocolate cake</h1>
    //       {images.map((image) => (
    //         <ImageComponent
    //           key={image.id}
    //           src={image.src}
    //           destination={image.destination}
    //         />
    //       ))}
    //       <div className="button-box">
    //         <button className="view">view</button>
    //       </div>
    //       </div>
    //   </div>

    // </div>
    <div className='cardborder'>
      <div className='cards'>
        {images.map((image) => (
          <ImageComponent
            key={image.id}
            src={image.src}
            destination={image.destination}
          />
        ))}
      </div>
    </div>

  );
};

export default ImagesContainer;