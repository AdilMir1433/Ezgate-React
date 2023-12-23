import React from "react";
import { useState } from "react";
import ResidentsForm from "./ResidentsForm";
import { getResidents } from "services/ResidentsAPI";
import { useEffect } from "react";

function Residents() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [residentData, setResidentData] = useState([]);

  const handleAddResidentsClick = () => {
    setShowAddForm(true);
  };

  const getAllResidents = async () => {
    try {
      const response = await getResidents();
      if (response.statusCode === "200") {
        setResidentData(response.data);
      } else {
        alert("Error fetching all residents");
      }
    } catch (error) {
      alert("Exception occured while fetching residents in the Resident From");
    }
  }

  useEffect(() => {
    
    getAllResidents();
  }, []);

  return (
    <div className="content">
      <button className="btn btn-primary" onClick={handleAddResidentsClick}>
        + Add Resident
      </button>
      {showAddForm && (
        <div className="col-md-12">
          <ResidentsForm setShowAddForm = {setShowAddForm}/>
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">All Residents</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table tablesorter" id="">
                  <thead className="text-primary">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Cell</th>
                      <th>CNIC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residentData && residentData.length > 0 ? (residentData.map(resident => (
                      <tr key={resident.residentId}>
                        <td>{resident.residentFirstName}</td>
                        <td>{resident.residentLastName}</td>
                        <td>{resident.residentCellNo}</td>
                        <td>{resident.residentNidPassport}</td>
                      </tr>
                    ))
                    ):(
                      <tr>
                        <td colSpan="4">No resident data available</td>
                      </tr>
                    )
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Residents;
