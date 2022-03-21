import React, { Component } from "react";
import { connect } from "react-redux";

import { languages } from "../../../utils/constant";
// import { Redirect, Route, Switch } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 9,
    };
  }
  async componentDidMount() {}

  render() {
    let { language } = this.props;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div>Detail specialty</div>
        <div className="detail-specialty-container">
          <div className="container">
            <div className="row detail-specialty-doctor">
              <div className="col-6 d-flex justify-content-center align-items-start">
                {" "}
                <ProfileDoctor
                  doctorId={this.state.id}
                  isShowDescription={true}
                  // dataTime={dataTime}
                />
              </div>
              <div className="col-6">
                <div className="pt-4">
                  <DoctorSchedule doctorIdFromParent={this.state.id} />
                </div>
                <div>
                  <DoctorExtraInfor doctorIdFromParent={this.state.id} />
                </div>
              </div>
            </div>
            <div className="row detail-specialty-doctor">
              <div className="col-6 d-flex justify-content-center align-items-start">
                {" "}
                <ProfileDoctor
                  doctorId={this.state.id}
                  isShowDescription={true}
                  // dataTime={dataTime}
                />
              </div>
              <div className="col-6">
                <div className="pt-4">
                  <DoctorSchedule doctorIdFromParent={this.state.id} />
                </div>
                <div>
                  <DoctorExtraInfor doctorIdFromParent={this.state.id} />
                </div>
              </div>
            </div>
            <div className="row detail-specialty-doctor">
              <div className="col-6 d-flex justify-content-center align-items-start">
                {" "}
                <ProfileDoctor
                  doctorId={this.state.id}
                  isShowDescription={true}
                  // dataTime={dataTime}
                />
              </div>
              <div className="col-6">
                <div className="pt-4">
                  <DoctorSchedule doctorIdFromParent={this.state.id} />
                </div>
                <div>
                  <DoctorExtraInfor doctorIdFromParent={this.state.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
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
