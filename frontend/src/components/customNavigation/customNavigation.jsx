import './customNavigation.css';
import { Outlet, NavLink } from "react-router-dom";

function CustomNavigation() {
    const isActiveClass = ({ isActive }) => {
        return { borderBottom: isActive ? '5px solid #baf7b0' : 'none', textDecoration: isActive ? 'none' : 'none' }
    };
    return (
        <>
            <div className="container mt-3 mb-2">
                <nav>
                    <ul className="nav">
                        <li><NavLink className="p-1 nav-link active" to="/home" style={isActiveClass}>Home</NavLink></li>
                        <li><NavLink className="p-1 nav-link" to="/addTeam" style={isActiveClass}>Add Team</NavLink></li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </>
    )
}

export default CustomNavigation;