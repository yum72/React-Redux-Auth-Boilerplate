import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import SignIn from './SignIn/SignIn'
import Register from './Register/Register'
import Home from './Home/Home'
import Public from './PublicPage/Public'
import NotFound from './NotFound/NotFound'
import Header from '../Components/Header'

export default function App() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )

  return (
    <Container maxWidth="lg">
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path='/' component={Public} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={Register} />
        <PrivateRoute path='/Home' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  )
}
