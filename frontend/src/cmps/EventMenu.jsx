import React from 'react'
import { NavLink } from 'react-router-dom';

export function EventMenu() {
    return (
        <div className="menu-container1">
            <NavLink to="/create">Football</NavLink>
            <NavLink to="/event">Basketball</NavLink>
            <NavLink to="/about">Running</NavLink>
            <NavLink to="/myevents">Volleyball</NavLink>
            <NavLink to="/myevents">Other</NavLink>
        </div>
    )
}
