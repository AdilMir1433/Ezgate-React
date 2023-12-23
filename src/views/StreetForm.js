import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import Select from "react-select";
import { dropdownCustomStyle } from "common/DropdownCustomStyle";
import { useCommunityContext } from "contexts/CommunityContext";
import { getAllBlocks } from "services/BlocksAPi";
import NotificationAlert from "react-notification-alert";
import { notify, notificationAlertRef } from "common/NotificationUtils";
import { addStreet } from "services/StreetApi";
import { useState,useEffect } from "react";


function StreetForm() {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  const community = useCommunityContext();
  const [streetData, setStreetData] = useState({
    streetName: "",
    blockByBlockId: {
      blockId: null,
      blockName: "",
      communityByCommunityId: community,
    },
    communityByCommunityId: community,
  });

  const getBlocks = async () => {
    try {
      const response = await getAllBlocks(community.communityId);
      if (response.statusCode === "200") {
        const blockData = response.data.map((block) => ({
          value: block.blockId,
          label: block.blockName,
        }));
        
        setOptions(blockData);
      } else {
        alert("Error fetching blocks in Street Form");
      }
    } catch (error) {
      alert("Exception occured while fetching blocks in Street Form");
    }
  };

  useEffect(() => {
    getBlocks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (selectedOption) => {
    setStreetData({
      ...streetData,
      blockByBlockId: {
        blockId: selectedOption.value,
        blockName: selectedOption.label,
        communityByCommunityId: community,
      },
    });

    setSelectedValue(selectedOption);
  };

  const handleStreetNameChange = (event) => {
    setStreetData({
      ...streetData,
      streetName: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await addStreet(streetData);
      if (response.statusCode === "200") {
        notify("tr", "success", "Street Saved Successfully");
      } else {
        notify("tr", "danger", "Error in Saving Street");
      }
    } catch (error) {
      console.error("Error adding street", error);
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
                <h5 className="title">Enter Street Name </h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Community (disabled)</label>
                        <Input
                          defaultValue={community.communityName}
                          disabled
                          placeholder="Enter here"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Street Name</label>
                        <Input
                          value={streetData.streetName}
                          onChange={handleStreetNameChange}
                          placeholder="Enter here"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Blocks</label>
                        <div style={{ minWidth: "250px" }}>
                          <Select
                            value={selectedValue}
                            onChange={handleOptionClick}
                            options={options}
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
        </Row>
      </div>
    </>
  );
}


export default StreetForm;
