import { faFaceLaughWink, faRibbon, faSitemap, faTachographDigital, faTasks, faUsers, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/dashboard">
                    <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
                    <span>Dashboard</span>
                </Link>
            </li>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/user-list">
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                    <span>Users</span>
                </Link>
            </li>
            {/* Nav Item EMployees */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/employee-list">
                    <FontAwesomeIcon icon={faUsersGear} style={{ marginRight: "0.5rem" }}/>
                    <span>Employees</span>
                </Link>
            </li>
            {/* Nav Item Department */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/department-list">
                    <FontAwesomeIcon icon={faSitemap} style={{ marginRight: "0.5rem" }}/>
                    <span>Departments</span>
                </Link>
            </li>
             {/* Nav Item Postion */}
             <li className="nav-item active">
                <Link className="nav-link" to="/portal/position-list">
                    <FontAwesomeIcon icon={faRibbon} style={{ marginRight: "0.5rem" }}/>
                    <span>Positions</span>
                </Link>
            </li>

             {/* Nav Item Activities */}
             <li className="nav-item active">
                <Link className="nav-link" to="/portal/department-list">
                    <FontAwesomeIcon icon={faTasks} style={{ marginRight: "0.5rem" }}/>
                    <span>Activities</span>
                </Link>
            </li>

        </ul>
    )
}

export default Sidebar