import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import store from "store/reducers/store";
import Login from "views/Login/Login";
import Finish from "views/Midtrans/Finish";
import Unfinish from "views/Midtrans/Unfinish";
import Gagal from "views/Midtrans/Gagal";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} exact />
        <Route path="/payment/finish" component={Finish} exact />
        <Route path="/payment/unfinish" component={Unfinish} exact />
        <Route path="/payment/error" component={Gagal} exact />

        {/* Redirect itu jadi, kalo misal user mengakses diluar path, maka akan default ke arah <Redirect /> */}
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>
);
