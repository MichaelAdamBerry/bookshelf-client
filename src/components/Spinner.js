import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default class Spinner extends React.Component {
  render() {
    return (
      <div
        style={{
          margin: "auto"
        }}>
        <FontAwesomeIcon
          icon={faSpinner}
          className="faSpin"
          style={{ height: "2em", width: "2em", color: "white" }}
          spin
        />
      </div>
    );
  }
}
