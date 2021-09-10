import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Header, Icon, Grid, GridColumn, Button } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom";

import { userActions } from '../actions';
import cls from './Navbar.module.scss';

export default withRouter(function Footer({ location }) {
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location.pathname]);

  const logOut = () => {
    dispatch(userActions.logout())
  }
  return (
    <>

      {currentPath !== '/' && currentPath !== '/settings' &&
        <div className={cls.logOut}>
          <Link to='/'>
            <Button style={{ width: '91vw', height: '6vh', marginBottom: '10px' }}> В главное меню </Button>
          </Link>
        </div>}

      {currentPath === '/settings' &&
        <>
            <Link to='/'>
              <Button style={{ width: '91vw', height: '6vh', marginBottom: '10px' }}> В главное меню </Button>
            </Link>
            <Link to="/" onClick={logOut}>
              <Button color='grey' style={{ width: '91vw', height: '6vh', marginBottom: '10px' }}> Выйти </Button>
            </Link>
        </>
      }
    </>
  )
})
