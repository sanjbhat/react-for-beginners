import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StorePickerJSX from "./StorePickerJSX";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={"/"} component={StorePickerJSX} />
            <Route path={"/store/:storeId"} component={App} />
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default Router;