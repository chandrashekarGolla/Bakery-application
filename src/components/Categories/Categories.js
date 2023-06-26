import React, { useState } from 'react';
import './Categories.css';
import Cupcake from '../Images/Cupcake.jpeg';
import BiscuitAll from '../Images/BiscuitAll.jpg'
import cake from '../Images/cake.jpeg';
import Icecream from '../Images/Icecream.jpeg';
import Pastry from '../Images/Pastry.jpeg';
import Chocolate from '../Images/Chocolate.jpeg';
import Biscuits from '../Biscuits/Biscuits';
import Chocolates from '../Chocolates/Chocolates';
import { Outlet } from 'react-router-dom';
import Cupcakes from '../Cupcakes/Cupcakes';
import Icecreams from '../Icecreams/Icecreams';

const Categories = () => {
  const imagesData = [
    { id: 1, path: Cupcake, name: 'Cup Cakes', type: 'cupcakes' },
    { id: 2, path: BiscuitAll, name: 'Biscuits', type: 'biscuits' },
    { id: 3, path: cake, name: 'Cakes', type: 'cakes' },
    { id: 4, path: Pastry, name: 'Pastries', type: 'pastries' },
    { id: 5, path: Chocolate, name: 'Chocolates', type: 'chocolates' },
    { id: 6, path: Icecream, name: 'Icecreams', type: 'icecreams' }
  ];

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleClick = (componentName) => {
    switch (componentName) {
      case 'biscuits':
        setSelectedComponent(<Biscuits />);
        break;
      case 'chocolates':
        setSelectedComponent(<Chocolates />);
        break;
      case 'cupcakes':
        setSelectedComponent(<Cupcakes />);
        break;
      case 'icecreams':
        setSelectedComponent(<Icecreams />);
        break;
      // Add cases for additional components
      default:
        setSelectedComponent(null);
    }
  };

  return (
    <div>
      {selectedComponent ? (
        selectedComponent
      ) : (
        <div className='category mt-4'>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 ml-2 p-3">
            {imagesData.map((obj) => (
              <div className="col m-2 card-item" key={obj.id}>
                <div className="card-body content">
                  <div className='image-bodys'>
                    <a href={`/${obj.type}`} onClick={() => handleClick(obj.type)}>
                      <img src={obj.path} alt="not available" title={obj.type} style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }} />
                    </a>
                  </div>
                  <h5 className="text-center p-2">{obj.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Categories;
