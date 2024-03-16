// Login.jsx
import React, { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Replace this function with your actual login API endpoint
  const fakeLoginApi = (data) => {
    return new Promise((resolve, reject) => {
      // Simulate a successful login for testing
      // Replace this with your actual API endpoint
      setTimeout(() => {
        resolve({ data: { token: "fakeToken" } });
      }, 1000);
      
      // Simulate an unsuccessful login for testing
      // Uncomment this block to test error handling
      // setTimeout(() => {
      //   reject({ response: { data: { message: "Login failed" } } });
      // }, 1000);
    });
  };

  // State to manage email, password, and loading state
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Navigate function to redirect to different pages
  const navigate = useNavigate();

  // Function to update the input state as the user types
  const getInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const submitData = (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace fakeLoginApi with your actual login API endpoint
    fakeLoginApi(input)
      .then((response) => {
        console.log("Login response:", response);

        // Assuming the API returns a token upon successful login
        const token = response.data.token;

        // Store the token in localStorage or a more secure storage option
        localStorage.setItem("token", token);

        // Navigate to the "/home" page
        navigate('/home');
      })
      .catch((err) => {
        console.error("Login failed:", err.message);

        if (err.response && err.response.data) {
          console.error("Error response from server:", err.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="body-3d">
      <div className="login-main">
        <Row>
          <Col>
            <div className="wrapper">
              {/* Your image goes here */}
            </div>
          </Col>
          <Col>
            <h1 className="login-head"><FaUserCircle /></h1>
            <div className="login-form">
              <Form onSubmit={submitData} className="wrapper">
                <h2>LOGIN</h2>
                <section className="group">
                  <Form.Control
                    type="text"
                    size="30"
                    className="input"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={getInput}
                  />
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                </section>
                <section className="group">
                  <Form.Control
                    type="password"
                    minLength="0"
                    className="input"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={getInput}
                  />
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                </section>
                <div>
                  <Form.Group>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                      <span style={{ fontSize: '12px', marginLeft: '5px', marginRight: '5px' }}>
                        Forgot your password?
                      </span>
                      {/* Add your anchor tag or button for the "Forgot your password?" functionality */}
                    </div>
                  </Form.Group>
                </div>
                <Button variant="dark" type="submit" className="button-style" disabled={loading}>
                  {loading ? 'Logging in...' : 'LOGIN'}
                </Button>
                <span className="footer"></span>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
