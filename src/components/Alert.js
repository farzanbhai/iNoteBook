import React, { useEffect } from "react";

function Alert(props) {
  // Capitalizes the first letter of the alert type and customizes it
  const capitalize = (word) => {
    if (word === "danger") {
      word = "ERROR"; // Customizing the 'danger' alert type to 'ERROR'
    }
    const lower = word.toLowerCase(); // Convert the word to lowercase
    return lower.charAt(0).toUpperCase() + lower.slice(1); // Capitalize the first letter and return
  };

  // Automatically hide the alert after 2 seconds
  useEffect(() => {
    if (props.alert) {
      // Check if an alert exists
      const timer = setTimeout(() => {
        props.setAlert(null); // Clear the alert after 2 seconds
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
    }
  }, [props.alert, props.setAlert]); // Runs whenever 'alert' or 'setAlert' changes

  return (
    <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 9999 }}>
      {/* Conditionally render the alert only if an alert is present */}
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`} // Dynamic alert class based on alert type
          role="alert"
        >
          {/* Display the alert type and message */}
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
