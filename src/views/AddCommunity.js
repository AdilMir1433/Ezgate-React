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
import { notify, notificationAlertRef } from "common/NotificationUtils";
import { addCommunity } from "services/CommunityAPI";

function AddCommunity() {

    const [community, setCommunity] = useState({
        communityName: "",
        communityLongitude: "",
        communityLatitude: ""
    });

    const handleInputChange = async (e) => {
        const { name, value, type, checked } = e.target;

        // Use checked for checkbox type, else use value
        const inputValue = type === "checkbox" ? checked : value;

        setCommunity({ ...community, [name]: inputValue });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting the form",community);

        try{
            const response = await addCommunity(community);
            console.log("Response: ", response);
            if(response?.statusCode === "200")
            {
                notify("tr","success","Community Saved Successfully");
            }
            else{
                notify("tr","danger","Error in Saving Community");
            }
        }
        catch(error)
        {
            console.log("Error in adding Community");
        }
        
    };

    return (
        <div className="content">
            <NotificationAlert ref={notificationAlertRef} />
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Add Community</h5>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <Label>Community Name</Label>
                                            <Input
                                                name="communityName"
                                                value={community.communityName}
                                                onChange={handleInputChange}
                                                placeholder="Enter Community Name"
                                                type="text"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <Label>Community Longitude</Label>
                                            <Input
                                                name="communityLongitude"
                                                value={community.communityLongitude}
                                                onChange={handleInputChange}
                                                placeholder="Enter Community Longitude"
                                                type="text"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <Label>Community Latitude</Label>
                                            <Input
                                                name="communityLatitude"
                                                value={community.communityLatitude}
                                                onChange={handleInputChange}
                                                placeholder="Enter Community Latitude"
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

export default AddCommunity;