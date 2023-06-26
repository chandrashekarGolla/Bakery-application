//works fine
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = () => {
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([
//     {
//       name: 'Category 1: Chocolates',
//       path: '/chocolates',
//       subItems: ['Almond Chocolates', 'Hazelnut Chocolates', 'Plain Chocolate', 'Customized chocolates - TBD'],
//       showSubItems: false
//     },
//     {
//       name: 'Category 2: Biscuits',
//       path: '/biscuits',
//       subItems: ['Chocolate Cookies (contains egg)', 'Brookies', 'Almond Cookies', 'Nutella Cookies', 'Butter Cookies', 'Karachi Cookies'],
//       showSubItems: false
//     }
//   ]);

//   const toggleSubItems = (index) => {
//     const updatedCategories = [...categories];
//     updatedCategories[index].showSubItems = !updatedCategories[index].showSubItems;
//     setCategories(updatedCategories);
//   };

//   // const handleHover = () => {
//   //   setShowCategories(true);
//   // };

//   // const handleLeave = () => {
//   //   setShowCategories(false);
//   // };
//   const handleHover = () => {
//     document.body.classList.add('sidebar-open');
//   };
  
//   const handleLeave = () => {
//     document.body.classList.remove('sidebar-open');
//   };

//   return (
//     <div className="sidebar" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
//       <div className="category-heading">
//         <span>Categories</span>
//       </div>
//       {showCategories && (
//         <ul className="categories">
//           {categories.map((category, index) => (
//             <li key={index} className="category">
//               <div className="category-name" onClick={() => toggleSubItems(index)}>
//                 {category.showSubItems ? '-' : '+'}{' '}
//                 <Link to={category.path}>{category.name}</Link>
//               </div>
//               {category.showSubItems && (
//                 <ul className="sub-items">
//                   {category.subItems.map((subItem, subIndex) => (
//                     <li key={subIndex}>
//                       <Link to={`${category.path}/${subIndex}`}>{subItem}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [categories, setCategories] = useState([
    {
      name: 'Chocolates',
      path: '/chocolates',
      subItems: ['Almond Chocolates', 'Hazelnut Chocolates', 'Plain Chocolate', 'Customized chocolates - TBD'],
      showSubItems: false
    },
    {
      name: 'Category 2: Biscuits',
      path: '/biscuits',
      subItems: ['Chocolate Cookies (contains egg)', 'Brookies', 'Almond Cookies', 'Nutella Cookies', 'Butter Cookies', 'Karachi Cookies'],
      showSubItems: false
    }
  ]);

  const toggleSubItems = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].showSubItems = !updatedCategories[index].showSubItems;
    setCategories(updatedCategories);
  };

  const handleHover = () => {
    setHovered(true);
    setShowSidebar(true);
  };

  const handleLeave = () => {
    setHovered(false);
    setTimeout(() => {
      if (!hovered) {
        setShowSidebar(false);
      }
    }, 200);
  };

  return (
    <div className="sidebar-container">
      <h3 className="sidebar-heading" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        Categories
      </h3>
      {showSidebar && (
        <div className="sidebar-content">
          <ul className="categories">
            {categories.map((category, index) => (
              <li key={index} className="category">
                <div className="category-name" onClick={() => toggleSubItems(index)}>
                  {category.showSubItems ? '-' : '+'} {category.name}
                </div>
                {category.showSubItems && (
                  <ul className="sub-items">
                    {category.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={`${category.path}/${subIndex}`}>{subItem}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

