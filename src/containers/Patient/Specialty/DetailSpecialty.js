import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getDetailSpecialtyByIdLocationService,
  getAllCodeService,
} from "../../../services/userService";
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
      detailSpecialty: {},
      listProvince: [],
      listDoctorsId: [],
    };
  }
  async componentDidMount() {
    try {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id
      ) {
        let res = await getDetailSpecialtyByIdLocationService({
          id: this.props.match.params.id,
          location: "ALL",
        });
        let resProvince = await getAllCodeService("PROVINCE");
        console.log("res", res, resProvince);
        if (
          res &&
          res.errCode === 0 &&
          resProvince &&
          resProvince.errCode === 0
        ) {
          let arrDoctorId = [];
          if (res.data.listDoctor && res.data.listDoctor.length > 0) {
            res.data.listDoctor.map((item, index) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
          this.setState({
            detailSpecialty: res.data,
            listProvince: resProvince.data,
            listDoctorsId: arrDoctorId,
          });
        } else {
          this.setState({
            detailSpecialty: {},
            listProvince: [],
            listDoctorsId: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleChangeProvice = async (e) => {
    try {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id
      ) {
        let res = await getDetailSpecialtyByIdLocationService({
          id: this.props.match.params.id,
          location: e.target.value,
        });
        console.log("res filter", res);
        if (res && res.errCode === 0) {
          let arrDoctorId = [];
          if (res.data.listDoctor && res.data.listDoctor.length > 0) {
            res.data.listDoctor.map((item, index) => {
              arrDoctorId.push(item.doctorId);
            });
          }
          this.setState({
            detailSpecialty: res.data,
            listDoctorsId: arrDoctorId,
          });
        } else {
          this.setState({
            detailSpecialty: {},

            listDoctorsId: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { language } = this.props;
    let { listProvince, detailSpecialty, listDoctorsId } = this.state;
    console.log("State", this.state);

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <>
          {detailSpecialty && detailSpecialty.descriptionHTML && (
            <div
              className="container"
              dangerouslySetInnerHTML={{
                __html: detailSpecialty.descriptionHTML,
              }}
            ></div>
          )}
        </>
        <div className="detail-specialty-container">
          <div className="container">
            <div className="row search-provice py-4 w-25">
              <select
                name="provice"
                onChange={(e) => this.handleChangeProvice(e)}
                className="form-select w-75"
              >
                {listProvince && listProvince.length > 0 && (
                  <option value="ALL">
                    {language === languages.VI ? "Toàn quốc" : "All"}
                  </option>
                )}
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option value={item.keyMap} key={index}>
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            {listDoctorsId && listDoctorsId.length > 0 ? (
              listDoctorsId.map((item, index) => {
                return (
                  <div className="row detail-specialty-doctor" key={index}>
                    <div className="col-6 d-flex align-items-start">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescription={true}
                        isShowPrice={false}
                        isShowDetail={true}

                        // dataTime={dataTime}
                      />
                    </div>
                    <div className="col-6">
                      <div className="pt-4">
                        <DoctorSchedule doctorIdFromParent={item} />
                      </div>
                      <div>
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center fw-bold fs-5 text-danger py-3">
                Không có thông tin bác sĩ ở địa điểm này!
              </p>
            )}
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
