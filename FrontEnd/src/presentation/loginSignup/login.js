import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import "./login.css";
import axios from "axios";
import swal from "sweetalert";
import Loading from "../loadingWindow/loading";

function Login() {
  const Navigate = useNavigate();
  const [logindata, setLogindata] = useState({
    email: "",
    type: null,
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading,setLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setLogindata((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!values.email) {
      errors.email = "email Is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This Is Not Valid Email";
    }
    if (!values.password) {
      errors.password = "Password Is required";
    } else if (!regexpassword.test(values.password)) {
      errors.password =
        "One UpperCase & One SpecialCharacter And More Than 8 value";
    }
    if (!values.type) {
      errors.type = " Registration Type Is required";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let url ="/"+logindata.type + "-login";
      setLoading(true);
      axios
        .post(url, logindata)
        .then((res) => {
          console.log('Login responce =>'+JSON.stringify(res));
          setLoading(false);
          if (res.data.success){
            sessionStorage.setItem(
              `${logindata.type}-loginData`,
              JSON.stringify(res.data.data)
            );

            if (res.data.data.type === "professional") {
              Navigate("/bookarea");
              window.location.reload();
            } else {
              Navigate("/service");
              window.location.reload();
            }
          }else {
            swal({
              icon: "error",
              title: "Oops...",
              text: "You Have Enter Wrong Input",
              footer: "Try With Authenticate Email And Password",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [formErrors]);

  useEffect(() => {
    if (sessionStorage.hasOwnProperty("user-loginData")) {
      Navigate("/service");
    } else if (sessionStorage.hasOwnProperty("professional-loginData")) {
      Navigate("/bookarea");
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    setFormErrors(validate(logindata));
    setIsSubmit(true);
  }

  return (
    <div className="root">
      {loading?<><Loading></Loading></>:(null)}
      <div className="login">
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Label>
              <b>Login Type</b>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              as={Col}
              md="8"
              onChange={handleChange}
              name="type"
            >
              <option value={null}>select</option>
              <option value="user">User</option>
              <option value="professional">Professional</option>
            </Form.Select>
            <span className="errorClass">{formErrors.type}</span>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="15"
              controlId="validationCustomUsername"
              id="email"
            >
              <Form.Label>
                <b>Email</b>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  onChange={handleChange}
                />
              </InputGroup>
              <span className="errorClass">{formErrors.email}</span>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="15" controlId="validationCustom03">
              <Form.Label>
                <b>Password</b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                name="password"
                onChange={handleChange}
              />
              <span className="errorClass">{formErrors.password}</span>
            </Form.Group>
          </Row>

          <Button type="submit" variant="outline-dark">
            LogIn
          </Button>
        </Form>
        <pre> </pre>
        <p className="forgot-password text-right">
          <span>
            <b>Don't Have Account ! </b>
          </span>
          <Link to="/signup"> SignUp </Link>
          <span>
            <b>||</b>
          </span>
          <Link to="/forgotpassword"> Forgot password? </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
