import React, { useState } from "react";
// import { chocolatesDropdown, biscuitsDropdown, pastriesDropdown } from "../Header/Navitems";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div>
      Heloo
    </div>
    // <div>
    //    {/* <ul
    //   className={dropdown ? "dropdown-items clicked" : "dropdown-items"}
    //   onClick={() => setDropdown(!dropdown)}
    // >
    //   {chocolatesDropdown.map((item) => {
    //     return (
    //       <li key={item.id}>
    //         <Link
    //           to={item.path}
    //           className={item.classname}
    //           onClick={() => setDropdown(false)}
    //         >
    //           {item.title}
    //         </Link>
    //       </li>
    //     );


    //   })}
    // </ul> */}
    // <ul
    //   className={dropdown ? "dropdown-items clicked" : "dropdown-items"}
    //   onClick={() => setDropdown(!dropdown)}
    // >
    //   {biscuitsDropdown.map((item) => {
    //     return (
    //       <li key={item.id}>
    //         <Link
    //           to={item.path}
    //           className={item.cName}
    //           onClick={() => setDropdown(false)}
    //         >
    //           {item.title}
    //         </Link>
    //       </li>
    //     );


    //   })}
    // </ul>
    // <ul
    //   className={dropdown ? "dropdown-items clicked" : "dropdown-items"}
    //   onClick={() => setDropdown(!dropdown)}
    // >
    //   {pastriesDropdown.map((item) => {
    //     return (
    //       <li key={item.id}>
    //         <Link
    //           to={item.path}
    //           className={item.cName}
    //           onClick={() => setDropdown(false)}
    //         >
    //           {item.title}
    //         </Link>
    //       </li>
    //     );


    //   })}
    // </ul>
   
    // </div>
   
    

  );
}

export default Dropdown