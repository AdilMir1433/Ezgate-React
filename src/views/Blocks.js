import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import { notify, notificationAlertRef } from "../common/NotificationUtils";

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
import { useCommunityContext } from "contexts/CommunityContext";
import { addSingleBlock } from "services/BlocksAPi";

function Blocks() {
  const community = useCommunityContext();

  const [block, setBlock] = useState({
    id: "",
    blockName: "",
    communityByCommunityId: {},
  });

  const onInputChange = (e) => {
    setBlock({ ...block, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    block.communityByCommunityId = community;
    try {
      const res = await addSingleBlock(block);
      if (res.statusCode === "200") {
        notify("tr", "success", "Block Saved Successfully");
      } else {
        notify("tr", "danger", "Error Saving Block");
      }
    } catch (error) {
      notify("tr", "danger", "Failed to save block");
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
                <h5 className="title">Add Block</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Community (disabled)</label>
                        <Input
                          defaultValue="DHA Phase 7"
                          disabled
                          placeholder="Community"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Block Name</label>
                        <Input
                          placeholder="e.g. Block W"
                          type="text"
                          name="blockName"
                          value={block.blockName}
                          onChange={(e) => onInputChange(e)}
                          required
                        />
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

export default Blocks;
