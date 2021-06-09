import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class SideBar extends Component {
  state = {
    isOpen: false,
  };

  onHamburgerClicked = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="mobile-container">
        <div onClick={() => this.onHamburgerClicked()} className="hamburger">
          ☰
        </div>
        <div className="side-bar-container">
          <div className={`side-bar ${this.state.isOpen ? "open" : "close"}`}>
            <div className="side-bar-link">
              <NavLink onClick={() => this.onHamburgerClicked()} className="explore-events-explore" to="/myevents">
                Profile
              </NavLink>
              <NavLink onClick={() => this.onHamburgerClicked()} className="explore-events-explore" to="/create">
                Create Event
              </NavLink>
              <NavLink onClick={() => this.onHamburgerClicked()} className="explore-events-explore" to="/event">
                Explore
              </NavLink>
              <NavLink onClick={() => this.onHamburgerClicked()} className="explore-events-explore" to="/login">
                  Login
                </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
