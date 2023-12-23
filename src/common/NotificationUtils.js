
import React from "react";
const notificationAlertRef = React.createRef();

const notify = (place, type, text) => {
  notificationAlertRef.current.notificationAlert({
    place: place,
    message: (
      <div>
        <div>{text}</div>
      </div>
    ),
    type: type,
    icon: "tim-icons icon-bell-55",
    autoDismiss: 5,
  });
};

export { notificationAlertRef, notify };
