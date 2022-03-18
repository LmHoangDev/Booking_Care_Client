import { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getProfileDoctorByIdService } from "../../../services/userService";
import { languages, CommonUtils } from "../../../utils";
import NumberFormat from "react-number-format";
import "./ProfileDoctor.scss";
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
    if (prevProps.doctorId !== this.props.doctorId) {
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
    let { inforDoctor } = this.state;
    let { language } = this.props;

    return (
      <>
        <div className="row">
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
              <p>
                {inforDoctor &&
                  inforDoctor.Markdown &&
                  inforDoctor.Markdown.description}
              </p>
              <p>14:00 - 14:30 - Thứ 6 - 18/03/2022</p>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
