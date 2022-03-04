import React from "react";
import PropTypes from "prop-types";

export default function UserInfo(props) {
  return (
    <div className="Online">
      <div className="UserInfo">
        <img className="Avatar" src={"data:image/jpeg;base64, " + props.img} />
        <div className="UserInfo-name">{props.login}</div>
        <div className="UserInfo-name">{props.email}</div>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  img: PropTypes.object,
  login: PropTypes.object,
  email: PropTypes.object,
};