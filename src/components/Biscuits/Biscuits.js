import React from 'react';
import { Outlet } from 'react-router-dom';
import vegicon from '../Images/vegicon.jpeg';
import nonvegicon from '../Images/nonvegicon.jpeg';
import { FaRupeeSign } from 'react-icons/fa';
import './Biscuits.css';
import imagesinfo from '../Imagesdata';
function Biscuits() {

    const biscuitsdata=imagesinfo.filter((item) => item.type === 'Biscuit');
  return (
    <div>
      <div className='cards'>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 ml-2 p-3'>
          {biscuitsdata.map((biscuitobj) => (
            <div className='col card-items m-2' key={biscuitobj.id}>
              <div className='card-body'>
                <div className='image-body'>
                  {biscuitobj.egg === 0 ? (
                    <img src={vegicon} alt='veg-icon' className='food-icon' />
                  ) : (
                    <img src={nonvegicon} alt='nonveg-icon' className='food-icon' />
                  )}
                  <a
                    href={`/price/${biscuitobj.id}?image=${encodeURIComponent(
                      biscuitobj.path
                    )}&price=${encodeURIComponent(biscuitobj.price)}&name=${encodeURIComponent(
                      biscuitobj.name)}&type=${encodeURIComponent(biscuitobj.type)}`}
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

export default Biscuits;

// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import AlmondCookie from '../Images/AlmondCookie.jpeg'
// import Brookie from '../Images/Brookie.jpeg'
// import KarachiCookie from '../Images/Karachi.jpeg'
// import vegimg from '../Images/vegicon.jpeg'
// import NutellaCookie from '../Images/NutellaCookie.jpeg'
// import nonvegicon from '../Images/nonvegicon.jpeg'
// import { FaRupeeSign } from "react-icons/fa";
// import './Biscuits.css'
// function Biscuits({ biscuits }) {

//   const biscuitsdata = [
//     { id: 1, path: AlmondCookie, name: 'Almond Cookie', price: '549', type: 'Cookie', egg:0},
//     { id: 2, path: Brookie, name: 'Brookie', price: '449', type: 'Cookie', egg: false },
//     { id: 3, path: KarachiCookie, name: 'Karachi Cookie', price: '649', type: 'Cookie', egg:0},
//     { id: 4, path: NutellaCookie, name: 'Nutella Cookie', price: '349', type: 'Cookie', egg:0 },
//     { id: 5, path: NutellaCookie, name: 'Chocolate Cookie', price: '349', type: 'Cookie', egg:1 },

//   ]


//   return (
//     <div>
//       <div className='cards'>
//         <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 ml-2 p-3">
//           {imagesinfo.map((biscuitobj) =>
//             <div className="col card-items m-2" key={biscuitobj.id}>
//               <div className="card-body ">
//                 <div className='image-body'>
//                 {biscuitobj.egg === 0 ? (
//     <img src={vegimg} alt='veg-icon' className='food-icon' />
//   ) : (
//     <img src={nonvegicon} alt='nonveg-icon' className='food-icon' />
//   )}
//               {/* {console.log(biscuitobj.egg)}
//                 {biscuitobj.egg==0 && <img src={vegimg} alt="veg-icon" className='food-icon'/> }
//                 {biscuitobj.egg==1 && <img src={nonvegicon} alt="nonveg-icon" className='food-icon'/> } */}
//                   <a href={`/price/${biscuitobj.id}?image=${encodeURIComponent(biscuitobj.path)}&price=${encodeURIComponent(biscuitobj.price)} &name=${encodeURIComponent(biscuitobj.name)}`} target="_blank" rel="noopener noreferrer">
//                     <img className='card-image ' src={biscuitobj.path} alt="Card" style={{
//                       width: '210px',
//                       height: '250px',
//                       objectFit: 'cover',
//                       borderRadius: '10px',
//                     }} />
//                   </a>
//                 </div>
//                 <h5 className="">{biscuitobj.name}</h5>
//                 <p className='fs-5 fw-semibold'><FaRupeeSign size={17}/> {biscuitobj.price}</p>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//       <Outlet />
//     </div>
//   )
// }

// export default Biscuits




  //   <div className=' card row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
  //   {
  //     imagesinfo.map((biscuitobj) =>
  //       <div className='col text-center' key={biscuitobj.id}>
  //         <div className='card'>
  //           {/* Image clicking case */}
  //           <div className='card-body'>
  //             <img src={vegimg} alt="" className='food-icon' />
  //             <a href={`/price/${biscuitobj.id}?image=${encodeURIComponent(biscuitobj.path)}&price=${encodeURIComponent(biscuitobj.price)}`} target="_blank" rel="noopener noreferrer">
  //               <img src={biscuitobj.path} alt="Card" />
  //             </a>
  //             <p>{biscuitobj.name}</p>
  //             <p>{biscuitobj.price}</p>
  //             {/* <button  className='btn btn-secondary' onClick={()=>handleButtonClick(biscuitobj)} >Place Order</button> */}
  //           </div>

  //         </div>
  //         <div class="container py-5">
  //           <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 py-5">
  //             {imagesinfo.map((biscuitobj)=>
  //             <div class="col" key={biscuitobj.id}>
  //               <div class="card">
  //               <img src={vegimg} alt="" className='food-icon' />
  //                 <a href={`/price/${biscuitobj.id}?image=${encodeURIComponent(biscuitobj.path)}&price=${encodeURIComponent(biscuitobj.price)}`} target="_blank" rel="noopener noreferrer">
  //                   <img src={biscuitobj.path} alt="Card" />
  //                 </a>
  //                 <div class="card-body">
  //                   <h5 class="card-title">{biscuitobj.name}</h5>
  //                 </div>
  //                 <div class="mb-5 d-flex justify-content-around">
  //                   <h3>₹ {biscuitobj.price}</h3>
  //                 </div>
  //               </div>
  //             </div>
  //             )}

  //           </div>
  //         </div>


  //       </div>)
  //   }

  // </div>
    // {/* <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
    //     {
    //       imagesinfo.map((biscuitobj)=><div className='col text-center' key={biscuitobj.id}>
    //         <div className='card'>
    //           <img src={biscuitobj.path} className='max-auto p-3 'alt="pic"/>
    //           <div className='card-body'>
    //             <p>{biscuitobj.name}</p>
    //             <p>{biscuitobj.price}</p>
    //             <button  className='btn btn-secondary' onClick={()=>handleButtonClick(biscuitobj)} >Place Order</button>
    //           </div>
              
    //         </div>
            
    //       </div>)
    //     }
        
    //   </div> */}
    // const navigate = useNavigate();



  //  to handle button click

  //this is working final
  // const handleButtonClick = (card) => {
  //   navigate(`/price/${card.id}`, { state: { image: card.path, price: card.price } });
  // };


  //Working for new tab opening
  // const handleButtonClick = (card) => {
  //   const priceComponentURL = `/price/${card.id}?image=${encodeURIComponent(card.path)}&price=${encodeURIComponent(card.price)}`;
  //   window.open(priceComponentURL, '_blank');
  // };