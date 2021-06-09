import { NavLink } from 'react-router-dom';
import { Logo } from './icon-cmps/logo';
import nemo from '../assets/imgs/nemoDemo.jpg';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SideBar } from '../cmps/SideBar';
let profileClicked = false;
let navBarOpen = false;

export const Header = (props) => {
  const { loggedInUser } = props;
  const location = useLocation();
  const [colorClass, setColorClass] = useState('');
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    if (location.pathname !== '/') setColorClass('main-header-color');
  });

  const onScroll = () => {
    let scroll = document.documentElement.scrollTop;
    if (location.pathname === '/') {
      if (scroll > 20) {
        setColorClass('main-header-color');
      } else {
        setColorClass('');
      }
    }
  };

  const onProfileClicked = () => {
    profileClicked = !profileClicked;
  };

  // const onHamburgerClicked = () => {
  //   navBarOpen = !navBarOpen;
  // };

  return (
    <div
      className={`main-header flex justify-between align-center ${colorClass}`}
    >
      <NavLink to="/" className="logo-container">
        <Logo />
        <h1 className="logo">
          Match<span className="logo-decoration">A</span>pp
          <span className="logo-decoration">.</span>
        </h1>
      </NavLink>
      <SideBar />
      <div className="nav-links">
        <NavLink className="creat-event-header" to="/create">
          Create Event
        </NavLink>
        <NavLink className="explore-events-explore" to="/event">
          Explore
        </NavLink>
        <div className="user-navs">
          <NavLink to="" onClick={onProfileClicked}>
            <div className="profile-menu">
              <img src={loggedInUser.imgUrl} alt="" />{' '}
              <div
                className={profileClicked ? 'login-modal' : 'login-modal-none'}
              >
                <NavLink className="my-profile-drop" to="/myevents">
                  Profile
                </NavLink>
                <NavLink className="my-login-drop" to="/login">
                  Login
                </NavLink>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
