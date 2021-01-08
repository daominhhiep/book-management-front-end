import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import './common.scss'
import Footer from './footer'
import Header from './header'

const MainLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="main-layout">
          <Header/>
          <div className={'main-body'}>
              <Component {...matchProps} />
          </div>
          <Footer></Footer>
      </div>
    )} />
  )
}

export default MainLayout
