import React from 'react';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import cake from './Images/cake.jpeg'
// import icecream from './Images/icecreams.jpeg'
// import chocolates from './Images/chocolates.jpeg'
import AlmondCookie from './Images/AlmondCookie.jpeg'
import Karachi from './Images/Karachi.jpeg'
import NutellaCookie from './Images/NutellaCookie.jpeg'
import Brookie from './Images/Brookie.jpeg'

// import Chocolates from "./Chocolates/Chocolates";
// import Icecreams from "./Icecreams/Icecreams";
// import Biscuits from './Biscuits/Biscuits';
// import PlainCakes from './Cakes/PlainCakes';

const ImageComponent = ({ src, alt, destination }) => {
  return (
    <Link to={destination}>
      <img src={src} alt={alt} />
    </Link>
  );
};

const ImagesContainer = () => {
  const images = [
    { id: 1, src: AlmondCookie, alt: 'Image 1', destination: '/biscuits/almondCookies' },
    { id: 2, src:Karachi , alt: 'Image 2', destination: '/biscuits/karachiCookies' },
    { id: 3, src: NutellaCookie, alt: 'Image 3', destination: '/biscuits/nutellaCookies' },
    { id: 4, src: Brookie, alt: 'Image 4', destination: '/biscuits/brookies' }

  ];

  return (
    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {
          images.map((biscuitobj)=><div className='col text-center' key={biscuitobj.id}>
            <div className='card'>
              {/* <img src={biscuitobj.src}  className='max-auto p-3 'alt="pic" onClick={<ImageComponent
          key={images.id}
          src={images.src}
          destination={images.destination}
        />}></img> */}
        <div>
        <Link to={images.destination}>
      <img src={images.src}  alt='cookie'/>
    </Link>
        </div>
        
              {/* {images.map((image) => (
        <ImageComponent
          key={image.id}
          src={image.src}
          destination={image.destination}
        />
      ))} */}
              <div className='card-body'>
                <p>{biscuitobj.name}</p>
                <p>{biscuitobj.price}</p>
                
              </div>
              
            </div>
            
          </div>)
        }
        
      </div>
    // <div>
    //   {images.map((image) => (
    //     <ImageComponent
    //       key={image.id}
    //       src={image.src}
    //       destination={image.destination}
    //     />
    //   ))}
    // </div>
  );
};

export default ImagesContainer;

// const ImageComponent = () => {

  
// const images = [
//   {
//     id: 1,
//     src: '../Images/Brookie.jpeg',
//     component: <Biscuits/>,
//   },
//   {
//     id: 2,
//     src: './Images/chocolates.jpeg',
//     component: <Chocolates />,
//   },
//   {
//     id: 3,
//     src: './Images/icecreams.jpeg',
//     component: <Icecreams />,
//   },
//   {
//     id: 4,
//     src: './Images/cake.jpeg',
//     component: <PlainCakes/>,
//   },
//   // Add more image details as needed
// ];

//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageClick = (image) => {
//     setSelectedImage(image.component);
//   };

//   return (
//     <div className="gallery">
//       {images.map((image) => (
//         <div key={image.id} className="card" onClick={() => handleImageClick(image)}>
//           <img src={image.src} alt={`Image ${image.id}`} />
//         </div>
//       ))}
//       {selectedImage && <div className="selected-image">{selectedImage}</div>}
//     </div>
//   );
// };

// export default ImageComponent;