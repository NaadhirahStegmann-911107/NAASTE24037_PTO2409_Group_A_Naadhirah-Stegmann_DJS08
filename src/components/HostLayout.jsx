import React from 'react';
import { Link, Outlet } from "react-router-dom";

export default function HostLayout() {
    return (
        <>
            <nav className="host-nav">
                <Link to="/host">Dashboard</Link>
                <Link to="/host/income">Income</Link>
                <link to="/host/reviews">Reviews</link>
            </nav>
            <Outlet />
        </>
    )
}