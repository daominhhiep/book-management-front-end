import React from 'react'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top custom-header">
            <div className="container-fluid">
                <a className="navbar-branch" href="#">
                    <img src="/image/septeni-logo.gif" height="60" />
                </a>
                <a className="nav-branch" style={{fontSize:"35px", color: "white", paddingLeft: "20px"}}>Book Management</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user">User</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">Admin</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header