import {React, useState} from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { authService } from "fbase";
import Navigation from "components/Navigation";
import Profile from "routes/Profile.js";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Switch>
                {isLoggedIn ?
                <>
                    <Route exact path="/">
                        <Home userObj = {userObj}></Home>
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}></Profile>
                    </Route>
                    <Redirect from="*" to="/" />
                </>
                     : (
                <>
                    <Route exact path="/">
                        <Auth></Auth>
                    </Route>
                    <Redirect from="*" to="/" />
                </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;