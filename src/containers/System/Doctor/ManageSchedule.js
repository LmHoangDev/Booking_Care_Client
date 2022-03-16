import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      arrTimes: [],
      selectedOption: null,
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
      this.setState({
        arrTimes: this.props.listTime,
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

  render() {
    console.log("State", this.state);
    let { language } = this.props;
    let { arrTimes } = this.state;
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
                minDate={new Date()}
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
                    <button key={index} className="btn btn-warning">
                      {language === languages.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
          </div>
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
