import React from "react";
import { useState, useEffect } from "react";
import EzgateLogo from "../assets/img/ezgate-logo.png";
import { userLogin } from "services/AuthApi";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
} from "reactstrap";
import { notify, notificationAlertRef } from "../common/NotificationUtils";
import NotificationAlert from "react-notification-alert";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin(username, password);
      if (res.statusCode === 200) {
        notify("tr", "success", "Logged in Successfully");
        const data = {
          user: res.data,
          token: res.refreshToken,
        };
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: data.user.userId,
            username: data.user.username,
          })
        );
        navigate("/admin/dashboard");
      } else {
        notify("tr", "danger", "Failed to Login");
      }
    } catch (error) {
      notify("tr", "danger", "Failed to Login");
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <NotificationAlert ref={notificationAlertRef} />
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={EzgateLogo}
            alt="Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <Card>
          <Form>
            <CardHeader className="d-flex align-items-center justify-content-center">
              <CardTitle tag="h3">Login</CardTitle>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  defaultValue="Write your Email here"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  defaultValue="Write your password here"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <span>
                Don't have an account? <a href="/register">Register</a>
              </span>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default Login;
