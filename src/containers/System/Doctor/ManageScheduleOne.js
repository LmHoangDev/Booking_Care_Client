import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getScheduleDoctorByDateService,
  saveBulkCreateSchedule,
} from "../../../services/userService";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
class ManageScheduleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTimes: [],
      currentDate: "",
      doctorId: "",
      dataState: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllTimeScheduleStartRedux();
    if (this.props.userInfo.id) {
      this.setState({
        doctorId: this.props.userInfo.id,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listTime !== this.props.listTime) {
      let data = this.props.listTime;
      let copyData = data.map((item, index) => {
        return { ...item, isSelected: false };
      });
      this.setState({
        arrTimes: copyData,
      });
    }
  }
  buildDataInput = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === languages.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeDatePicker = async (date) => {
    this.setState({
      currentDate: date[0],
      //   dataState: [],
    });
    let formatDate = new Date(date[0]).getTime();
    // let formatDate = new Date(this.state.currentDate).getTime();
    try {
      let res = await getScheduleDoctorByDateService(
        this.state.doctorId,
        formatDate
      );

      // console.log("res-shedule-bydate", res.data);
      if (res && res.errCode === 0 && res.data.length > 0) {
        let arrTimesByDoctor = res.data.map((item, index) => {
          return item.timeType;
        });
        console.log("arrTimesByDoctor", arrTimesByDoctor);
        this.setState({
          dataState: arrTimesByDoctor,
        });
        let dataz = this.props.listTime;
        let copyData = dataz.map((item, index) => {
          return { ...item, isSelected: false };
        });
        this.setState({
          arrTimes: copyData,
        });
        // console.log("arrSelect", arrTimesByDoctor);
        let data = this.state.arrTimes;
        let data1 = this.state.dataState;
        console.log("data1", data1);
        console.log("data", data);
        let dataCopy = data.map((item, index) => {
          if (data1.length > 0 && data1.includes(item.keyMap)) {
            item.isSelected = true;
          }
          return item;
        });
        this.setState({
          arrTimes: dataCopy,
          dataState: [],
        });
      } else {
        let data = this.props.listTime;
        let copyData = data.map((item, index) => {
          return { ...item, isSelected: false };
        });
        this.setState({
          arrTimes: copyData,
          dataState: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleClickTime = (time) => {
    // console.log("Item selected", time);
    let data = this.state.arrTimes;
    let dataCopy = data.map((item, index) => {
      if (item.id === time.id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    this.setState({
      arrTimes: dataCopy,
    });
  };

  handleSaveInfor = async () => {
    let { arrTimes, doctorId, currentDate } = this.state;
    let result = [];

    if (!currentDate) {
      toast.error("Invalid date !");
      return;
    }

    // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formatDate = new Date(currentDate).getTime();

    if (arrTimes && arrTimes.length > 0) {
      let filterTimes = arrTimes.filter((item) => item.isSelected === true);
      if (filterTimes && filterTimes.length > 0) {
        filterTimes.map((schedule, index) => {
          let object = {};
          object.doctorId = doctorId;
          object.date = formatDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time !");
        return;
      }
    }
    if (!_.isEmpty(result)) {
      try {
        let res = await saveBulkCreateSchedule({
          arrSchedule: result,
          doctorId: doctorId,
          formatDate: formatDate,
        });
        if (res && res.errCode === 0) {
          this.setState({
            // arrDoctors: [],
            // arrTimes: [],
            selectedOption: {},
            currentDate: "",
          });
          let data = this.props.listTime;
          let copyData = data.map((item, index) => {
            return { ...item, isSelected: false };
          });
          this.setState({
            arrTimes: copyData,
          });
          return await toast.success("Save information schedule successfully!");
        } else {
          return await toast.error("Save information schedule failed!");
        }
        // console.log("res", res);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("Result", result);
  };

  render() {
    console.log("State", this.state);
    let { language } = this.props;
    let { arrTimes } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <>
        <div className="container">
          <h2 className="title">
            <FormattedMessage id="manage-schedule.title" />
          </h2>
          <div className="row mt-4">
            <div className="col-6 form-group">
              <label htmlFor="choose-date">
                {" "}
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                id="choose-date"
                className="form-control"
                onChange={this.handleChangeDatePicker}
                minDate={yesterday}
                value={this.state.currentDate}
              />
            </div>{" "}
          </div>
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center gap-3">
              {arrTimes &&
                arrTimes.length > 0 &&
                arrTimes.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        item.isSelected
                          ? "btn btn-warning"
                          : "btn btn-default border border-dark"
                      }
                      onClick={() => this.handleClickTime(item)}
                    >
                      {language === languages.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
          </div>
          <button
            className="btn btn-primary text-light mt-4"
            onClick={() => this.handleSaveInfor()}
          >
            Lưu thông tin
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,

    language: state.app.language,
    listTime: state.admin.allDataTime,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllTimeScheduleStartRedux: () =>
      dispatch(actions.fetchAllTimeScheduleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageScheduleOne);
