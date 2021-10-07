import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import VideoContext from '../../context/video/videoContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const videoContext = useContext(VideoContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearVideos } = videoContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearVideos();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <Link to='/customize'>Customize</Link>
      </li>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
     
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;