import React, { Component } from "react";
import { connect } from "react-redux";

import { languages } from "../../../utils/constant";
// import { Redirect, Route, Switch } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  render() {
    let { language } = this.props;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="container">DetailSpecialty</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
