import { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getProfileDoctorByIdService } from "../../../services/userService";
import { languages, CommonUtils } from "../../../utils";
import NumberFormat from "react-number-format";
import "./ProfileDoctor.scss";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inforDoctor: {},
    };
  }

  async componentDidMount() {
    let data = await this.getProfileDoctor(this.props.doctorId);
    this.setState({
      inforDoctor: data,
    });
  }
  getProfileDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorByIdService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getProfileDoctor(this.props.doctorId);
      this.setState({
        inforDoctor: data,
      });
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
    }
    return name;
  };
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === languages.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === languages.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("dddd - DD/MM/YYYY");
      return (
        <>
          <div>
            <span>
              {time} / {date.charAt(0).toUpperCase() + date.slice(1)}
            </span>
            <br />
            <span>
              <FormattedMessage id="patient.extra-infor.free-booking" />
            </span>
          </div>
        </>
      );
    }
  };

  render() {
    let { inforDoctor } = this.state;
    let {
      language,
      isShowDescription,
      dataTime,
      isShowPrice,
      isShowDetail,
      doctorId,
    } = this.props;
    // console.log(dataTime);

    return (
      <div className="row w-100">
        <div className="col-2 avatar-doctor-container">
          <img
            className="avatar-doctor-detail"
            alt=".."
            src={inforDoctor && inforDoctor.image}
          />
        </div>
        <div className="col-10">
          <div className="px-5 py-4">
            <h4 className="fs-5 fw-bold">
              {this.showName(inforDoctor, language)}
            </h4>
            {isShowDescription ? (
              <p>
                {inforDoctor &&
                  inforDoctor.Markdown &&
                  inforDoctor.Markdown.description}
              </p>
            ) : (
              <>{this.renderTimeBooking(dataTime)}</>
            )}
          </div>
        </div>
        {isShowPrice ? (
          <div className="col-12 mt-2">
            <span>
              <FormattedMessage id="patient.extra-infor.price" />
            </span>
            <span className="mx-1">
              {inforDoctor &&
              inforDoctor.Doctor_infor &&
              language === languages.VI &&
              inforDoctor.Doctor_infor.priceTypeData ? (
                <NumberFormat
                  value={inforDoctor.Doctor_infor.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              ) : (
                ""
              )}
              {inforDoctor &&
              inforDoctor.Doctor_infor &&
              language === languages.EN &&
              inforDoctor.Doctor_infor.priceTypeData ? (
                <NumberFormat
                  value={inforDoctor.Doctor_infor.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              ) : (
                ""
              )}
            </span>
          </div>
        ) : (
          ""
        )}
        {isShowDetail ? (
          <Link
            className="mt-2 d-block see-more"
            to={`/detail-doctor/${doctorId}`}
          >
            Xem thêm
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
