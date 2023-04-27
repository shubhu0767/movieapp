import React from "react";
import { Alert } from "flowbite-react";

const AlertPopup = ({closeAlert, text}) => {
  return (
    <Alert
      color="success"
      onDismiss={closeAlert}
      className="max-w-sm absolute sticky top-10 left-3 z-20"
    >
      <span>
        <span className="font-medium">Info alert!</span> {text}
      </span>
    </Alert>
  );
};

export default AlertPopup;
