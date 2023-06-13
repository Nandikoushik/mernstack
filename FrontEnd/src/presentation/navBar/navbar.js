import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./navbar.css";
function Navbar() {
  const [userName, setUserName] = useState("Sir/Mam");
  const [type, setType] = useState(null);
  const Logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (sessionStorage.hasOwnProperty("professional-loginData")) {
      setUserName(
        JSON.parse(sessionStorage.getItem("professional-loginData")).Name.split(
          " "
        )[0]
      );
      setType("professional");
    } else if (sessionStorage.hasOwnProperty("user-loginData")) {
      setUserName(
        JSON.parse(sessionStorage.getItem("user-loginData")).Name.split(" ")[0]
      );
      setType("user");
    }
  }, []);

  return (
    <div className="navbarclass">
      <Table style={{ "margin-bottom": "1px" }}>
        <tbody>
          <tr>
            <td style={{ color: "red", textAlign: "left" }}>
              <NavLink to="/admin" className="nav-bar-link">
                <b>=</b>
              </NavLink>
            </td>
            <td style={{ color: "red", textAlign: "left" }}>
              <NavLink className="nav-bar-link">
                <b>Hello {userName}</b>
              </NavLink>
            </td>
            <td style={{ color: "red" }}>
              <NavLink to="/" className="nav-bar-link">
                <b>Home</b>
              </NavLink>
            </td>
            <td style={{ color: "red", textAlign: "right" }}>
              <NavLink to="/about" className="nav-bar-link">
                <b>About</b>
              </NavLink>
            </td>
            <td style={{ color: "red", textAlign: "right" }}>
              <NavLink to="/contact" className="nav-bar-link">
                <b>Contact</b>
              </NavLink>
            </td>
            <td style={{ textAlign: "right", color: "red" }}>
              {type === "user" ? (
                <NavLink to="/addtocart" className="nav-bar-link">
                  <b>Cart</b>
                </NavLink>
              ) : (
                <NavLink to="/bookarea" className="nav-bar-link">
                  <b>Cart</b>
                </NavLink>
              )}
            </td>
            {sessionStorage.hasOwnProperty("user-loginData") ||
            sessionStorage.hasOwnProperty("professional-loginData") ? (
              <td style={{ textAlign: "right" }}>
                <NavLink onClick={Logout} to="/about" className="nav-bar-link">
                  <b>LogOut</b>
                </NavLink>
              </td>
            ) : (
              <td style={{ textAlign: "right" }} className="nav-bar-link">
                <NavLink to="/logIn" className="nav-bar-link">
                  <b>LogIn</b>
                </NavLink>{" "}
                <NavLink to="/signup" className="nav-bar-link">
                  <b>Signup</b>
                </NavLink>
              </td>
            )}
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
export default Navbar;
