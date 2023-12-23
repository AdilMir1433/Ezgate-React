import { useEffect, useState } from "react";
import { getAllCommunity } from "services/CommunityAPI";
import AssignAdminToCommunity from "./AssignAdminToCommunity";

function AssignCommunity() {
  const [communityData, setCommunityData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  const getCommunity = async () => {
    try {
      const response = await getAllCommunity();
      if (response.statusCode === "200") {
        setCommunityData(response.data);
      }
      else {
        alert("Error fetching all the community");
      }
    }
    catch (error) {
      alert("Exception occured while fetching the communities.")
    }


  }

  const handleButtonClick = () => {
    setShowComponent(true);
  }

  useEffect(() => {

    getCommunity();
  }, []);

  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"></h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table tablesorter" id="">
                  <thead className="text-primary">
                    <tr>
                      <th>Cummunity Name</th>
                      <th>Community Longitude</th>
                      <th>Community Latitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {communityData && communityData.length > 0 ? (communityData.map(community => (
                      <tr key={community.communityId}>
                        <td>{community.communityName}</td>
                        <td>{community.communityLongitude}</td>
                        <td>{community.communityLatitude}</td>
                        <td>
                            <button className="btn btn-primary" onClick={handleButtonClick}>
                              Assign Admin
                            </button>
                        </td>
                      </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan="4">No community data</td>
                      </tr>
                    )
                    }
                  </tbody>
                </table>
              </div>
              {showComponent && <AssignAdminToCommunity/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignCommunity;