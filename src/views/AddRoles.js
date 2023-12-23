import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { notificationAlertRef } from "common/NotificationUtils";

function AddRoles() {

    const [role, setRole] = useState({
        roleName: ""
    });

    const handleInputChange = async (e) => {
        const { name, value, type, checked } = e.target;

        // Use checked for checkbox type, else use value
        const inputValue = type === "checkbox" ? checked : value;

        setRole({ ...role, [name]: inputValue });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting the form",role);
    };

    return (
        <div className="content">
            <NotificationAlert ref={notificationAlertRef} />
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Add Roles</h5>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <Label>Role Name</Label>
                                            <Input
                                                name="roleName"
                                                value={role.roleName}
                                                onChange={handleInputChange}
                                                placeholder="Enter Role Name"
                                                type="text"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="submit"
                                    style={{
                                        marginTop: "30px",
                                    }}
                                >
                                    Save
                                </Button>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AddRoles