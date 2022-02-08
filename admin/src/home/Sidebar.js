import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item">
          <Link to="/">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Orders</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/book">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Books</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/category">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Category</span>
          </a>
          </Link>
       </li>
        <li className="nav-item">
          <Link to='/sub-category'>
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Sub-Category</span>
          </a>
          </Link>
         
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Admin</span>
          </a>
        </li>
        {/* Divider */}
      </ul>
    </>
  );
}
