import { Component } from "react";
import { connect } from "react-redux";
// import { Redirect, Route, Switch } from "react-router-dom";
import moment from "moment";
import { languages } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import "./DoctorSchedule.scss";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTimes: [],
    };
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  setArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = [];
      if (language === languages.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }

    this.setState({
      allDays: arrDate,
    });
  };
  async componentDidMount() {
    let { language } = this.props;
    this.setArrDays(language);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setArrDays(this.props.language);
    }
  }
  handleChangeTime = async (e) => {
    console.log("value time", e.target.value);
    let date = e.target.value;
    let doctorId = this.props.doctorIdFromParent;
    let res = await getScheduleDoctorByDateService(doctorId, date);
    if (res && res.errCode === 0) {
      this.setState({
        allAvailableTimes: res.data ? res.data : [],
      });
    }
  };

  render() {
    let { language } = this.props;
    let { allDays, allAvailableTimes } = this.state;

    return (
      <>
        <select
          name="times"
          className="w-25 select-date"
          onChange={(e) => this.handleChangeTime(e)}
        >
          {allDays &&
            allDays.length > 0 &&
            allDays.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="all-available-time">
          <div className="text-calendar">
            <span className="icon-calendar">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <span>
              <FormattedMessage id="manage-schedule.schedule" />
            </span>
          </div>
          <div className="list-calendar mt-3">
            {allAvailableTimes && allAvailableTimes.length > 0 ? (
              allAvailableTimes.map((item, index) => {
                let timeDisplay =
                  language === languages.VI
                    ? item.timeTypeData.valueVi
                    : item.timeTypeData.valueEn;
                return (
                  <button className="btn btn-warning" key={index}>
                    {timeDisplay}
                  </button>
                );
              })
            ) : (
              <div className="text-danger announce">
                <FormattedMessage id="manage-schedule.no-schedule" />
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
