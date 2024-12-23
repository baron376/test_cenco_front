import React from "react";
import { Route } from "react-router-dom";
import RoutesOut from './RoutesOut'
import RoutesInt from './RoutesInt'

const RouterAll = () => (
    <Route>
        <RoutesOut/>
        <RoutesInt/>
    </Route>
);

export default RouterAll;