import React, { useEffect, useState } from "react";
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
import Select from "react-select";
import { dropdownCustomStyle } from "common/DropdownCustomStyle";
import NotificationAlert from "react-notification-alert";
import { notify, notificationAlertRef } from "common/NotificationUtils";
import { useCommunityContext } from "contexts/CommunityContext";
import { getAllLocations } from "services/LocationsApi";
import { addResident } from "services/ResidentsAPI";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';


const ResidentsForm = ({ setShowAddForm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [locationOptions, setLocationOptions] = useState([]);

  const [resident, setResident] = useState({
    residentNidPassport: "",
    residentFirstName: "",
    residentLastName: "",
    residentCellNo: "",
    residentGender: "",
    residentDateOfBirth: "",
    isTenant: 0,
    isOwner: 0,
    isActive: 1,
    parentResidentNid: null,
    newResidentFamilyId: null,
    nidImageFront: "",
    nidImageBack: "",
    locationDTO: {
      locationId: ""
    },
    communityId: 1,
  });

  const genderOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'others', label: 'Others' }
  ];

  const community = useCommunityContext();

  const handleLocationClick = (selectedOption) => {

    setSelectedLocation(selectedOption);
    setIsOpen(false);
    setResident({
      ...resident,
      locationDTO: {
        locationId: selectedOption.value
      },
    });
  };
  const handleGenderClick = (selectedOption) => {
    setSelectedGender(selectedOption);
    setIsOpen(false);
    setResident({
      ...resident,
      residentGender: selectedOption.value,
    });
  }

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target;

    // Use checked for checkbox type, else use value
    const inputValue = type === "checkbox" ? checked : value;

    setResident({ ...resident, [name]: inputValue });

  };

  const handleDateChange = (date) => {
      const formattedDate = date ? date.format('YYYY-MM-DD'): null;
      setResident ({
        ...resident,
        residentDateOfBirth: formattedDate,
      })
  }

  const handleTenantClick = () => {
    console.log("tenant clicked");
    setResident((prevResident) => ({
      ...prevResident,
      isOwner: 0,
      isTenant: 1,
    }));
  };

  const handleOwnerClick = () => {
    console.log("owner clicked");
    setResident((prevResident) => ({
      ...prevResident,
      isTenant: 0,
      isOwner: 1,
    }));
  };

  const handleCancelFormClick =  () => {
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("before sending: ", resident);

    try {
      const response = await addResident(resident);
      console.log("Response: ", response);
      if(response?.statusCode === "200")
      {
        notify("tr", "success", "Resident Saved Successfully");
      }
      else{
        notify("tr", "danger", "Error in Saving Resident");
      }
    } catch (error) {
      console.error("Error adding resident", error);
    }
  };


  const getLocations = async () => {
    try {
      const response = await getAllLocations(community.communityId);
      if (response.statusCode === "200") {
        const locationData = response.data.map((location) => ({
          value: location.locationId,
          label: location.locationHouseNo + ", " + location.streetName + ", " + location.blockName  
        }));

        setLocationOptions(locationData);
      } else {
        alert("Error fetching locations in Resident Form");
      }
    } catch (error) {
      alert("Exception occured while fetching locations in the Resident From");
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className="content">
      <NotificationAlert ref={notificationAlertRef} />
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Add Resident</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label>NID/Passport</Label>
                      <Input
                        name="residentNidPassport"
                        value={resident.residentNidPassport}
                        onChange={handleInputChange}
                        placeholder="Enter NID/Passport"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label>First Name</Label>
                      <Input
                        name="residentFirstName"
                        value={resident.residentFirstName}
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input
                        name="residentLastName"
                        value={resident.residentLastName}
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label>Cell Number</Label>
                      <Input
                        name="residentCellNo"
                        value={resident.residentCellNo}
                        onChange={handleInputChange}
                        placeholder="Enter Cell Number"
                        type="text"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Address</label>
                      <div style={{ minWidth: "250px" }}>
                        <Select
                          value={selectedLocation}
                          onChange={handleLocationClick}
                          options={locationOptions}
                          isSearchable
                          placeholder="Select a location"
                          styles={dropdownCustomStyle}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Gender</label>
                      <div style={{ minWidth: "250px" }}>
                        <Select
                          value={selectedGender}
                          onChange={handleGenderClick}
                          options={genderOptions}
                          isSearchable
                          placeholder="Select a gender"
                          styles={dropdownCustomStyle}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label>Date of Birth</Label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                          value = {selectedDate}
                          onChange={handleDateChange}
                          renderInput={(startProps, endProps) => (
                            <>
                               <TextField {...startProps} variant="standard" margin="normal" helperText="" />
                                <MobileDatePicker {...endProps} variant="standard" margin="normal" helperText="" />
                            </>
                          )}
                        />
                      </LocalizationProvider>
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add more form fields based on your ResidentsDTO */}
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup check>
                      <Label
                        check
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Input
                          type="radio"
                          name="residentType"
                          checked={resident?.isTenant}
                          onChange={handleTenantClick}
                          style={{
                            display: "none",
                          }}
                        />
                        <span
                          style={{
                            width: "18px",
                            height: "18px",
                            border: "2px solid white",
                            backgroundColor: resident.isTenant
                              ? "blue"
                              : "transparent",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                        ></span>
                        Tenant
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup check>
                      <Label
                        check
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Input
                          type="radio"
                          name="residentType"
                          checked={resident?.isOwner}
                          onChange={handleOwnerClick}
                          style={{
                            display: "none",
                          }}
                        />
                        <span
                          style={{
                            width: "18px",
                            height: "18px",
                            border: "2px solid white",
                            backgroundColor: resident.isOwner
                              ? "blue"
                              : "transparent",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                        ></span>
                        Owner
                      </Label>
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
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={handleCancelFormClick}
                  style={{
                    marginTop: "30px",
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ResidentsForm;
