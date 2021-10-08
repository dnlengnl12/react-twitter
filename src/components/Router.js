import {React, useState} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { authService } from "fbase";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    return (
        <Router>
            <Switch>
                {isLoggedIn ?
                <>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                </>
                     : (
                    <Route exact path="/">
                         <Auth></Auth>
                    </Route>
                     )}
            </Switch>
        </Router>
    )
}

export default AppRouter;