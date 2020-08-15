import React, { Component } from "react";

import confLogo from "../images/badge-header.svg";
import Gravatar from "./Gravatar";
import "./styles/Badge.css";

class Badge extends Component {
  render() {
    const { firstName, lastName, jobTitle, twitter, email } = this.props;
    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={confLogo} alt="imagen" />
        </div>

        <div className="Badge__section-name">
          <Gravatar className="Badge__avatar" email={email} alt="Avatar" />
          <h1>
            {firstName} <br /> {lastName}
          </h1>
        </div>

        <div className="Badge__section-info">
          <h3>{jobTitle}</h3>
          <div>@{twitter}</div>
        </div>

        <div className="Badge__footer">#PlatziConf</div>
      </div>
    );
  }
}

export default Badge;
