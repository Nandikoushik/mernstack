import { Routes, Route } from "react-router-dom";
import Home from "../presentation/homePAge/home";
import About from "../presentation/About Page/about";
import Contact from "../presentation/contact/contact";
import PageNotFound from "../presentation/PageNotFound/pageNotFound";
import Login from "../presentation/loginSignup/login";
import signup from "../presentation/loginSignup/signup";
import Service from "../component/servicepage/service";
import Bookingarea from "../component/Bokingarea/bookingarea";
import Addtocart from "../component/AddToCart/addtocart";
import ProtectedUserRoute from "../protectedRoute/ProtectedUserRoute";
import ProtectedProfRoute from "../protectedRoute/protectedProfRoute";

function routes() {
  return (
    <Routes>
      <Route path="/" Component={Home} exact={true}></Route>
      <Route path="/about" Component={About}></Route>
      <Route path="/contact" Component={Contact}></Route>
      <Route path="/login" Component={Login}></Route>
      <Route path="/signup" Component={signup}></Route>

      {/*Protectwd route  start From Here.....*/}
      <Route
        path="/service"
        element={<ProtectedUserRoute Component={Service} />}
      ></Route>
      <Route
        path="/bookarea"
        element={<ProtectedProfRoute Component={Bookingarea} />}
      ></Route>
      <Route
        path="/addtocart"
        element={<ProtectedUserRoute Component={Addtocart} />}
      ></Route>
      <Route path="/admin" Component={Home}></Route>
      <Route path="*" Component={PageNotFound}></Route>
    </Routes>
  );
}
export default routes;
