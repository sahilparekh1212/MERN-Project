import './customNavigation.css';
import {Outlet, NavLink } from "react-router-dom";

function CustomNavigation() {
    const isActiveClass = ({isActive})=>{return {backgroundColor : isActive ? '#baf7b0' :'',textDecoration: isActive ? 'none' : 'none'}};
    return (
        <>
            <div className="container">
                <nav>
                    <ul className="nav nav-tabs">
                        <li><NavLink to="/home" style={isActiveClass}>Home</NavLink></li>
                        <li><NavLink to="/addTeam" style={isActiveClass}>Add Team</NavLink></li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </>
    )
}

export default CustomNavigation;