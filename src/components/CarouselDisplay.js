import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import cake from './Images/cake.jpeg'
import chocolates from '../components/Images/chocolates.jpeg'
import icecreams from '../components/Images/icecreams.jpeg'
import './CarouselDisplay.css'
function CarouselDisplay() {
  return (
    <div className='container mt-5 '>
      <Carousel className='carousel d-block mt-5'>
        <Carousel.Item interval={1500}>
          <div className='d-flex carousel-item'>
            
           
            <img
              className="d-block  p-2  img"
              src={cake}
              alt="First slide"
            />
            <img
              className="d-block  p-2 img "
              src={cake}
              alt="First slide"
            />
             <img
              className="d-block p-2 img"
              src={cake}
              alt="First slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item  interval={1500}>
          <div className='d-flex carousel-item'>
            <img
              className="d-block p-2 img"
              src={chocolates}
              alt="Second slide"
            />
            <img
              className="d-block p-2 img"
              src={chocolates}
              alt="Second slide"
            />
            <img
              className="d-block  p-2 img"
              src={chocolates}
              alt="Second slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <div className='d-flex carousel-item'>
            <img
              className="d-block p-2 img"
              src={icecreams}
              alt="Third slide"
            />
            <img
              className="d-block p-2 img"
              src={icecreams}
              alt="Third slide"
            />
            <img
              className="d-block p-2 img"
              src={icecreams}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>

  )
}

export default CarouselDisplay