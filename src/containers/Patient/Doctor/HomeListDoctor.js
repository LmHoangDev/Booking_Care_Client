import { HomeOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import { CommonUtils, languages } from "../../../utils";
import HomeFooter from "../../HomePage/HomeFooter";
// import "./HomeListDoctor.scss";
// import "./DetailClinic.scss";
class HomeListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],

      //   listDoctorsId: [],
    };
  }
  componentDidMount() {
    this.props.fetchTopDoctorRedux();
    if (this.props.topDoctorsRedux) {
      this.setState({
        listDoctor: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        listDoctor: this.props.topDoctorsRedux,
      });
    }
  }
  handleViewDetailDoctor = (item) => {
    // console.log("View detail", item);
    this.props.history.push(`/detail-doctor/${item.id}`);
  };
  render() {
    let { listDoctor } = this.state;
    console.log("state", this.state);
    let language = this.props.language;
    return (
      <>
        <div className="container-list-home container">
          <div className="row">
            {" "}
            <div
              className="col-12 title text-left"
              onClick={() => this.props.history.push("/home")}
              style={{ cursor: "pointer" }}
            >
              <span>
                <HomeOutlined />
                Bác sĩ
              </span>
            </div>
            <div className="col-12 mt-4">
              <h5>Bác sĩ nổi bật</h5>
            </div>
            {listDoctor &&
              listDoctor.length > 0 &&
              listDoctor.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = Buffer.from(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                let nameEn = CommonUtils.removeVietnameseTones(
                  `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                );
                return (
                  <div
                    className="col-12 mt-4 mb-3"
                    key={index}
                    style={{ cursor: "pointer", display: "flex" }}
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <div className="col-3">
                      <img
                        src={imageBase64}
                        alt=""
                        style={{ maxWidth: "200px", height: "150px" }}
                      />
                    </div>
                    <div className="col-9">
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="mt-3"
                      >
                        {language === languages.VI ? nameVi : nameEn}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>{" "}
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    clinics: state.admin.clinics,
    doctors: state.admin.doctors,
    specialties: state.admin.specialties,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
    fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeListDoctor)
);
