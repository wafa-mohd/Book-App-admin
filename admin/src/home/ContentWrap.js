import React from 'react'
import { Link } from 'react-router-dom'

export default function ContentWrap(props) {
    return (
        
            <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars" />
            </button>
            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block" />
              {/* Nav Item - User Information */}
              <li className="nav-item dropdown no-arrow">
               
                <a className="nav-link">
                <Link to="/login" className="mr-2 d-none d-lg-inline text-gray-600 small" >
                Login
                </Link>
                </a>
              </li>
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link " href="#">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">Logout</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* End of Topbar */}
          {/* Begin Page Content */}
          <div className="container-fluid">
              {props.children}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
      </div> 
    )
}
