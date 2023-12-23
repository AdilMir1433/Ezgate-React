import { useCommunityContext } from "contexts/CommunityContext";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { addLocation } from "services/LocationsApi";
import { getAllBlocks } from "services/BlocksAPi";
import { getAllStreets } from "services/StreetApi";
import { notify, notificationAlertRef } from "../common/NotificationUtils";
import { dropdownCustomStyle } from "common/DropdownCustomStyle";

export default function LocationComponent() {
  const community = useCommunityContext();
  const [selectedValue, setSelectedValue] = useState(null);

  const [selectedValueStreet, setSelectedValueStreet] = useState("");

  const [blocks, setBlocks] = useState([
    {
      blockId: "",
      blockName: "",
      communityByCommunityId: {},
    },
  ]);
  const [streets, setStreets] = useState([
    {
      streetId: "",
      streetName: "",
      blockByBlockId: {},
      communityByCommunityId: {},
    },
  ]);

  const [location, setLocation] = useState({
    locationId: "",
    locationStreet: "",
    locationBlock: "",
    locationHouseNo: "",
    blockName: "",
    streetName: "",
    communityByCommunityId: {},
  });

  const [block, setBlock] = useState({
    blockId: "",
    blockName: "",
    communityByCommunityId: {},
  });

  const [street, setStreet] = useState({
    streetId: "",
    streetName: "",
    blockByBlockId: {},
    communityByCommunityId: {},
  });

  const getBlocks = async () => {
    try {
      const res = await getAllBlocks(community.communityId);
      if (res.statusCode === "200") {
        const formattedBlocks = res.data.map((block) => ({
          value: block.blockId,
          label: block.blockName,
        }));
        setBlocks(formattedBlocks);
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Exception");
    }
  };

  const getStreets = async () => {
    try {
      const res = await getAllStreets(community.communityId);
      if (res.statusCode === "200") {
        const formattedStreets = res.data.map((street) => ({
          value: street.streetId,
          label: street.streetName,
        }));
        setStreets(formattedStreets);
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Exception");
    }
  };

  useEffect(() => {
    getBlocks();
    getStreets();

    console.log(streets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setBlock({
      blockId: option.value,
      blockName: option.label,
    });
  };

  const handleOptionClickStreet = (option) => {
    setSelectedValueStreet(option);
    setStreet({
      streetId: option.value,
      streetName: option.label,
    });
  };

  const onInputChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    location.communityByCommunityId = community;
    location.locationBlock = block.blockId;
    location.locationStreet = street.streetId;
    location.blockName = block.blockName;
    location.streetName = street.streetName;
    try {
      const response = await addLocation(location);
      if (response.statusCode === "200") {
        notify("tr", "success", "Location Saved Successfully");
      } else {
        notify("tr", "danger", "Error Saving Location");
      }
    } catch (error) {
      notify("tr", "danger", "Failed to save Location");
    }
  };

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlertRef} />
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Add Location</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Community (disabled)</label>
                        <Input disabled placeholder="DHA Phase 7" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <FormGroup>
                        <label>House Address</label>
                        <Input
                          placeholder="e.g B 76"
                          type="text"
                          name="locationHouseNo"
                          value={location.locationHouseNo}
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Blocks</label>
                        <div style={{ minWidth: "250px" }}>
                          <Select
                            value={selectedValue}
                            onChange={handleOptionClick}
                            options={blocks}
                            isSearchable
                            placeholder="Select an option"
                            styles={dropdownCustomStyle}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Streets</label>
                        <div style={{ minWidth: "250px" }}>
                          <Select
                            value={selectedValueStreet}
                            onChange={handleOptionClickStreet}
                            options={streets}
                            isSearchable
                            placeholder="Select an option"
                            styles={dropdownCustomStyle}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
