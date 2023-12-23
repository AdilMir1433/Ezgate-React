import React, { useEffect } from "react";
import { getLocalStorage } from "common/LocalStorageUtil";
import { useNavigate } from "react-router-dom";

import {
  Row
} from "reactstrap";

function DashboardBackOffice(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorage("token");
    if (token == null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="content">
        <Row>
          Hi
        </Row>
        <Row>
          Hello
        </Row>
        <Row>
         Mishgha
        </Row>
      </div>
    </>
  );
}

export default DashboardBackOffice;
