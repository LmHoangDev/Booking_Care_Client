import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailDoctorById } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import { languages } from "../../../utils/constant";
// import { Redirect, Route, Switch } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import DoctorExtraInfor from "./DoctorExtraInfor";
import DoctorSchedule from "./DoctorSchedule";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    try {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id
      ) {
        let res = await getDetailDoctorById(this.props.match.params.id);
        if (res && res.errCode === 0) {
          this.setState({
            detailDoctor: res.data,
          });
        } else {
          console.log("res", res.errMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  showName = (data, language) => {
    let name = "";
    if (data && data.positionData) {
      if (language === languages.VI) {
        name = `${data.positionData.valueVi} ${data.lastName} ${data.firstName}`;
      } else {
        name = CommonUtils.removeVietnameseTones(
          `${data.positionData.valueEn} ${data.firstName} ${data.lastName}`
        );
      }
    } else {
      name = "";
    }
    return name;
  };

  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="container">
          <div className="doctor-intro">
            <div className="row">
              <div className="col-2 avatar-doctor-container">
                <img
                  className="avatar-doctor-detail"
                  alt=".."
                  src={detailDoctor && detailDoctor.image}
                />
              </div>
              <div className="col-10">
                <h2 className="name-doctor">
                  {this.showName(detailDoctor, language)}
                </h2>
                <p className="desc-doctor">
                  {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description
                    ? detailDoctor.Markdown.description
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="schedule-intro my-4">
            <div className="row">
              <div className="col-6">
                <DoctorSchedule
                  doctorIdFromParent={
                    detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                  }
                />
              </div>
              <div className="col-6 extra-infor">
                <DoctorExtraInfor
                  doctorIdFromParent={
                    detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                  }
                />
              </div>
            </div>
          </div>
          <div className="detail-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
