import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
import {navItems} from './Navitems';
import Dropdown from '../Dropdown/Dropdown.js'
function Categories() {

    const [dropdown, setDropdown] = useState(false);

	return (
		<nav className="navbar">
			<ul className="nav-items">
				{navItems.map((item) => {
					if (item.title === "Chocolates") {
						return (
							<li
								key={item.id}
								className={item.classname}
								onMouseEnter={() => setDropdown(true)}
								onMouseLeave={() => setDropdown(false)}
							>
								<Link to={item.path}>{item.title}</Link>
								{dropdown && <Dropdown />}
							</li>
						);
					}
					else if (item.title === "Cakes") {
						return (
							<li
								key={item.id}
								className={item.classname}
								onMouseEnter={() => setDropdown(true)}
								onMouseLeave={() => setDropdown(false)}
							>
								<Link to={item.path}>{item.title}</Link>
								{dropdown && <Dropdown />}
							</li>
						);
					}
					else if (item.title === "Biscuits") {
						return (
							<li
								key={item.id}
								className={item.classname}
								onMouseEnter={() => setDropdown(true)}
								onMouseLeave={() => setDropdown(false)}
							>
								<Link to={item.path}>{item.title}</Link>
								{dropdown && <Dropdown />}
							</li>
						);
					}
					else if (item.title === "Pastries") {
						return (
							<li
								key={item.id}
								className={item.classname}
								onMouseEnter={() => setDropdown(true)}
								onMouseLeave={() => setDropdown(false)}
							>
								<Link to={item.path}>{item.title}</Link>
								{dropdown && <Dropdown />}
							</li>
						);
					}
				})}
			</ul>
		</nav>
	)
}

export default Categories