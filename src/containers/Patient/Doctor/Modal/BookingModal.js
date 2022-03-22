import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import Select from "react-select";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { languages } from "../../../../utils";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      genders: [],
      doctorId: "",
      selectedGender: {},
      timeType: "",
    };
  }
  async componentDidMount() {
    this.props.fetchGenderStartRedux();
  }
  toggle = () => {
    this.props.toggleModal();
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.genders !== this.props.genders) {
      let dataSelect = this.buildDataInput(this.props.genders);
      this.setState({
        genders: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInput(this.props.genders);
      this.setState({
        genders: dataSelect,
      });
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        this.setState({
          doctorId: this.props.dataTime.doctorId,
          timeType: this.props.dataTime.timeType,
        });
      }
    }
  }
  buildTimeBooking = (dataTime) => {
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
      return `${time} / ${date}`;
    }
    return "";
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === languages.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return name;
    }
    return "";
  };
  handleSaveMedicalAppointment = async () => {
    let {
      fullName,
      email,
      phoneNumber,
      address,
      reason,
      doctorId,
      selectedGender,
      timeType,
    } = this.state;
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    await this.props.savePatientBookingAppointment({
      fullName,
      phoneNumber,
      email,
      address,
      reason,
      birthday: date,
      date: this.props.dataTime.date,
      doctorId: doctorId,
      selectedGender: selectedGender.value,
      timeType,
      language: this.props.language,
      timeString,
      doctorName,
    });
    await this.toggle();
  };
  handleChange = (e) => {
    let { name, value } = e.target;
    let copyState = { ...this.state };
    copyState[name] = value;
    this.setState({
      ...copyState,
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  buildDataInput = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.valueVi}`;
        let labelEn = `${item.valueEn}`;
        object.label = language === languages.VI ? labelVi : labelEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  render() {
    //   console.log("data from parent :", this.props.dataTime);
    let { dataTime } = this.props;
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    // console.log("State booking modal:", this.state);

    return (
      <>
        <Modal
          isOpen={this.props.isShowModal}
          toggle={() => this.toggle()}
          size="lg"
          centered
          className={"modal-container"}
        >
          <ModalHeader toggle={() => this.toggle()}>
            <FormattedMessage id="patient.extra-infor.infor-booking" />
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescription={false}
                dataTime={dataTime}
                isShowPrice={true}
                isDetail={false}
              />
              <div className="row mt-2">
                <div className="form-group col-6">
                  <label htmlFor="fullName">
                    <FormattedMessage id="patient.extra-infor.fullname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter fullName"
                    name="fullName"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.fullName}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="phoneNumber">
                    <FormattedMessage id="patient.extra-infor.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter phoneNumber"
                    name="phoneNumber"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.phoneNumber}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-6">
                  <label htmlFor="email">
                    {" "}
                    <FormattedMessage id="patient.extra-infor.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="address">
                    {" "}
                    <FormattedMessage id="patient.extra-infor.address-patient" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter address"
                    name="address"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.address}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-12">
                  <label htmlFor="reason">
                    {" "}
                    <FormattedMessage id="patient.extra-infor.reason" />
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="reason"
                    placeholder="Enter reason"
                    name="reason"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.reason}
                  ></textarea>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="birthday">
                    {" "}
                    <FormattedMessage id="patient.extra-infor.birthday" />
                  </label>
                  <DatePicker
                    id="birthday"
                    className="form-control"
                    onChange={this.handleChangeDatePicker}
                    // minDate={yesterday}
                    value={this.state.birthday}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="gender">
                    {" "}
                    <FormattedMessage id="patient.extra-infor.gender" />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                    id="doctor"
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              className="px-3"
              onClick={() => this.handleSaveMedicalAppointment()}
            >
              <FormattedMessage id="patient.extra-infor.confirm" />
            </Button>
            <Button onClick={() => this.toggle()} className="px-3">
              <FormattedMessage id="patient.extra-infor.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStartRedux: () => dispatch(actions.fetchGenderStart()),
    savePatientBookingAppointment: (data) =>
      dispatch(actions.savePatientBookingAppointment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
