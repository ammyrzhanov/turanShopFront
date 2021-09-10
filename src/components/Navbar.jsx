import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Header, Icon, Grid, GridColumn, Button } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom";

import { userActions } from '../actions';
import cls from './Navbar.module.scss';

export default withRouter(function Navbar({ location }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const { pathname } = location;
    console.log("New path:", pathname);
    setCurrentPath(pathname);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(userActions.getProfile());
  }, [])

  const logOut = () => {
    dispatch(userActions.logout())
  }
  return (
    <>
      <Grid className={cls.navigation} divided='vertically'>
        <Grid.Row className={cls.rowConatainer}>
          <Header className={cls.header}>
            {user.data &&
              <>
              <Link>
                <Icon className={cls.iconUser} name='user' />
                <Header.Content className={cls.userName}>
                  {user.data.first_name} {user.data.last_name}
                  <Header.Subheader className={cls.userPhone}>{user.data.phone}</Header.Subheader>
                </Header.Content>
                </Link>
              </>}
          </Header>
          {currentPath !== '/settings' &&
            <Link to="/settings" >
              <Icon className={cls.iconUser} name='settings' />
            </Link>
          }
        </Grid.Row>
      </Grid>
    </>
  )
})
