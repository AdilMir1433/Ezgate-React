import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify, notificationAlertRef } from "../common/NotificationUtils";
import NotificationAlert from "react-notification-alert";

// reactstrap components
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
  Alert,
} from "reactstrap";
import { userSignup } from "services/AuthApi";

function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    setError(null);
    event.preventDefault();
    if (
      !password1 ||
      !name
    ) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }
    if (password1 !== password2) {
      setError("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }
    setIsSubmitting(true);

    try{
      const response = await userSignup(name,password1);
      if(response.statusCode === 200)
      {
        notify("tr","success","Signed up successfully");
        navigate("/login");
      }
      else
      {
        notify("tr","danger","Failed to Signup");
      }
    }
    catch(error)
    {
      notify("tr","danger","Failed to Signup");
    }



  }
  return (
    <div>
      <NotificationAlert ref={notificationAlertRef} />
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <Card>
          <Form>
            <CardHeader>
              <CardTitle tag="h3">Sign Up</CardTitle>
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <FormGroup>
                <Label>
                  Name<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Name"
                  placeholder="Write your name here"
                  type="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Password<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Write your password here"
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Repeat Password<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Write your password again"
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </FormGroup>
              <span>
                Already have an account? <a href="/login">Login</a>
              </span>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
                {isSubmitting ? "..." : ""}
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default Register;
