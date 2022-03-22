import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailClinicByIdService } from "../../../services/userService";
import { languages } from "../../../utils/constant";
// import { Redirect, Route, Switch } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailClinic.scss";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailClinic: {},

      listDoctorsId: [],
    };
  }
  async componentDidMount() {
    console.log("Id", this.props.match.params.id);
    try {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id
      ) {
        let res = await getDetailClinicByIdService(this.props.match.params.id);
        console.log("res", res);
        if (res && res.errCode === 0) {
          let arrDoctorId = [];
          if (res.data.listDoctor && res.data.listDoctor.length > 0) {
            res.data.listDoctor.map((item, index) => {
              arrDoctorId.push(item.doctorId);
            });
          }
          this.setState({
            detailClinic: res.data,

            listDoctorsId: arrDoctorId,
          });
        } else {
          this.setState({
            detailClinic: {},

            listDoctorsId: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { language } = this.props;
    let { detailClinic, listDoctorsId } = this.state;
    console.log("State", this.state);

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <>
          {detailClinic && detailClinic.descriptionHTML && (
            <div
              className="container"
              dangerouslySetInnerHTML={{
                __html: detailClinic.descriptionHTML,
              }}
            ></div>
          )}
        </>
        <div className="detail-specialty-container">
          <div className="container">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
