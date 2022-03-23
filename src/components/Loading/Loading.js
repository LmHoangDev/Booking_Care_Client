import React, { Component } from "react";
import Background from "../../assets/images/loading.gif";
import "./Loading.scss";
export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {" "}
        {this.props.isLoading && this.props.isLoading ? (
          <div
            className="loading-page"
            style={{
              backgroundImage: `url(${Background})`,
            }}
          ></div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
