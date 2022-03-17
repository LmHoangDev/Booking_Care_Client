import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import {
  languages,
  CRUD_ACTIONS,
  CommonUtils,
  dateFormat,
} from "../../../utils";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { toast } from "react-toastify";
import { saveBulkCreateSchedule } from "../../../services/userService";
import _ from "lodash";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      arrTimes: [],
      selectedOption: {},
      currentDate: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllTimeScheduleStartRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let dataSelect = this.buildDataInput(this.props.listDoctors);
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.listTime !== this.props.listTime) {
      let data = this.props.listTime;
      let copyData = data.map((item, index) => {
        return { ...item, isSelected: false };
      });
      this.setState({
        arrTimes: copyData,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInput(this.props.listDoctors);
      this.setState({
        arrDoctors: dataSelect,
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
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
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
    let { arrTimes, selectedOption, currentDate } = this.state;
    let result = [];

    if (_.isEmpty(selectedOption)) {
      toast.error("Invalid selected doctor !");
      return;
    }
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
          object.doctorId = selectedOption.value;
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
          doctorId: selectedOption.value,
          formatDate: formatDate,
        });
        if (res && res.errCode === 0) {
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
              <label htmlFor="choose-doctor">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.arrDoctors}
                id="doctor"
              />
            </div>
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
    listDoctors: state.admin.doctors,
    language: state.app.language,
    listTime: state.admin.allDataTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllTimeScheduleStartRedux: () =>
      dispatch(actions.fetchAllTimeScheduleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
