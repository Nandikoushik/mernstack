import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Signup() {
  const Navigate = useNavigate();
  const [formdata, setFormData] = useState({
    Name: "",
    contact: null,
    email: "",
    address: "",
    state: "",
    pin: "",
    type: null,
    service: null,
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!values.Name) {
      errors.Name = "Name Is required";
    }
    if (!values.contact) {
      errors.contact = "contact No Is required";
    } else if (values.contact > 9 && values.contact < 11) {
      errors.contact = "Contat No Greater Than 10 And Less Than 11";
    }

    if (!values.email) {
      errors.email = "email Is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This Is Not Valid Email";
    }

    if (!values.address) {
      errors.address = "address Is required";
    }
    if (!values.state) {
      errors.state = "State Is required";
    }
    if (!values.pin) {
      errors.pin = "Zip Code Is required";
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
    if (values.type === "professional") {
      if (!values.service) {
        errors.service = "Service Type is Required";
      }
    }

    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let url = "/" + formdata.type + "-Registration";
      let emaildata = {
        email: formdata.email,
        Name: formdata.Name,
        type: formdata.type,
        action: "signup",
      };
      if (formdata.type === "professional") {
        formdata.pending = false;
        formdata.booking = false;
        formdata.feedback = 1;
      }
      axios
        .post(url, formdata)
        .then((res) => {
          console.log("success", res);
          if (res.data.acknowledged === true) {
            swal("Good job!", "Acount Created Succesfully", "success");
            Navigate("/login");
            axios
              .post("/sendMail", emaildata)
              .then((res) => {
                if (res.success) {
                  console.log("Email Send success");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            swal({
              icon: "error",
              title: "Oops...",
              text: "Something Went Wrong",
              footer: "Try After Sometime",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formdata));
    setIsSubmit(true);
  };

  return (
    <div className="signroot">
      <div id="sign">
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>
                <b>Name</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                name="Name"
                onChange={handleChange}
              />
              <span className="errorClass">{formErrors.Name}</span>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>
                <b>Contact</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact"
                name="contact"
                onChange={handleChange}
              />
              <span className="errorClass">{formErrors.contact}</span>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>
                <b>Email</b>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                aria-describedby="inputGroupPrepend"
                name="email"
                onChange={handleChange}
              />
              <span className="errorClass">{formErrors.email}</span>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>
                <b>Address</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={handleChange}
                name="address"
              />
              <span className="errorClass">{formErrors.address}</span>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>
                <b>State</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                onChange={handleChange}
                name="state"
              />
              <span className="errorClass">{formErrors.state}</span>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>
                <b>Zip Code</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name="pin"
                onChange={handleChange}
              />
              <span className="errorClass">{formErrors.pin}</span>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md={formdata.type === "professional" ? "4" : "8"}
              controlId="validationCustom07"
            >
              <Form.Label>
                <b>Registration Type</b>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="type"
                onChange={handleChange}
              >
                <option value={null}>Select</option>
                <option value="user">User</option>
                <option value="professional">Professional</option>
              </Form.Select>
              <span className="errorClass">{formErrors.type}</span>
            </Form.Group>
            {formdata.type === "professional" ? (
              <Form.Group as={Col} md="4" controlId="validationCustom08">
                <Form.Label>
                  <b>Service</b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="service"
                  onChange={handleChange}
                >
                  <option value={null}>Select</option>
                  <option value="electrician">Electrician</option>
                  <option value="driver">Driver</option>
                </Form.Select>
                <span className="errorClass">{formErrors.service}</span>
              </Form.Group>
            ) : null}
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>
                <b>Password</b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
              <span className="errorClass">{formErrors.password}</span>
            </Form.Group>
          </Row>

          <Button type="submit" variant="outline-dark">
            Submit
          </Button>
        </Form>
        <pre> </pre>
        <p className="forgot-password text-right">
          <span>
            <b>Already Have Account ! </b>
          </span>
          <Link to="/login">SignIn</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
