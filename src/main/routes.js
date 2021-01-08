import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MainLayout from './app/layout/mainLayout'
import HomePage from './app/ui/home/homePage'
import NotFoundPage from './app/layout/notFoundPage'
import UserPage from './app/ui/user/userPage'
import AdminPage from './app/ui/admin/adminPage'
import BorrowingPage from './app/ui/borrowing/borrowingPage'

export default (
    <Router>
      <div>
        <Switch>
          <MainLayout exact path="/" component={HomePage} />
          <MainLayout exact path="/user" component={UserPage} />
          <MainLayout exact path="/admin" component={AdminPage} />
          <MainLayout exact path="/borrowing-history" component={BorrowingPage} />
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </Router>
)
