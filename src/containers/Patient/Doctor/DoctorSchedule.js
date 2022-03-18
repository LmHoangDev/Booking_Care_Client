import { Component } from "react";
import { connect } from "react-redux";
// import { Redirect, Route, Switch } from "react-router-dom";
import moment from "moment";
import { languages } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import "./DoctorSchedule.scss";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTimes: [],
      isShowModal: false,
      dataScheduleTimeModal: {},
    };
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  getArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = [];
      if (language === languages.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM2 = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM2}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }

    return arrDate;
  };
  async componentDidMount() {
    let { language } = this.props;
    let arrDays = this.getArrDays(language);
    this.setState({
      allDays: arrDays,
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let arrDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: arrDays,
      });
    }
    // fetch-api-first
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDateService(
        this.props.doctorIdFromParent,
        this.state.allDays[0].value
      );
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTimes: res.data ? res.data : [],
        });
      }
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
  toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
    });
  };
  handleShowModal = (item) => {
    this.setState({ isShowModal: true, dataScheduleTimeModal: item });
    // console.log("Item show modal", item);
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
          <div>
            {allAvailableTimes && allAvailableTimes.length > 0 ? (
              <>
                <div className="list-calendar mt-3">
                  {allAvailableTimes.map((item, index) => {
                    let timeDisplay =
                      language === languages.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        className="btn btn-warning"
                        key={index}
                        onClick={() => this.handleShowModal(item)}
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <span>
                    <FormattedMessage id="manage-schedule.choose" />{" "}
                    <i className="far fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="manage-schedule.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="text-danger announce">
                <FormattedMessage id="manage-schedule.no-schedule" />
              </div>
            )}
          </div>
        </div>

        <BookingModal
          isShowModal={this.state.isShowModal}
          toggleModal={this.toggleModal}
          dataTime={this.state.dataScheduleTimeModal}
        />
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
