import React from 'react';

const LogoBar = () => {
    return (
        <div className="logo-header " data-background-color="purple2">
            <a href="/Home" className="h5 text-white fw-bold my-auto text-decoration-none btn  mx-1">
                PIXELCREW
            </a>
            <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                    <i className="icon-menu" />
                </span>
            </button>
            <button className="topbar-toggler more"><i className="icon-options-vertical" /></button>
            <div className="nav-toggle ml-5" style={{ zIndex: -1 }}>
                <button className="btn btn-toggle toggle-sidebar mx-4">
                    <i className="icon-menu" />
                </button>
            </div>
        </div>
    )
}

export default LogoBar;