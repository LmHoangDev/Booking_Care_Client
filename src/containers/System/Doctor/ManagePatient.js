import { Component } from "react";
import DatePicker from "react-flatpickr";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllPatientForDoctorService,
  sendRemedyService,
} from "../../../services/userService";

import moment from "moment";
import "./ManagePatient.scss";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isShowRemedyModal: false,
      dataModal: "",
      isLoading: false,
      isDisabled: false,
    };
  }
  async componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctorService({
      doctorId: user.id,
      date: formatDate,
    });
    console.log("ress", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleChangeDatePicker = async (date) => {
    await this.getDataPatient();
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        this.getDataPatient();
      }
    );
  };
  handleConfirmBooking = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isShowRemedyModal: true,
      dataModal: data,
    });
  };
  toggleModal = () => {
    this.setState({
      isShowRemedyModal: !this.state.isShowRemedyModal,
    });
  };
  sendRemedy = async (data) => {
    try {
      let { dataModal } = this.state;
      this.setState({
        isLoading: true,
      });
      let res = await sendRemedyService({
        doctorId: dataModal.doctorId,
        patientId: dataModal.patientId,
        timeType: dataModal.timeType,
        email: data.email,
        language: this.props.language,
        image: data.image,
        patientName: dataModal.patientName,
      });
      if (res && res.errCode === 0) {
        toast.success("Confirm appointment successfully!");
        this.getDataPatient();
        this.toggleModal();
      } else {
        toast.error("Confirm appointment failed!");
      }
      this.setState({
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("this state", this.state);
  };
  render() {
    console.log("State", this.state);
    let { dataPatient } = this.state;
    return (
      <>
        <Loading isLoading={this.state.isLoading} />
        <div className="container">
          <h2 className="title">
            <FormattedMessage id="manage-patient.title" />
          </h2>
          <div className="row">
            <div className="col-6">
              <label htmlFor="choose-date">
                {" "}
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                id="choose-date"
                className="form-control"
                onChange={this.handleChangeDatePicker}
                value={this.state.currentDate}
              />
            </div>
          </div>
          <table className="table table-hover mt-5">
            <thead className="table-dark">
              <tr>
                <th>STT</th>
                <th>Thời gian</th>
                <th>Họ và tên</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataPatient && dataPatient.length > 0 ? (
                <>
                  {dataPatient.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.timeTypeDataPatient.valueVi}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.patientData.genderData.valueVi}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => this.handleConfirmBooking(item)}
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-danger fw-bold fs-3"
                  >
                    Không có bệnh nhân trong ngày này!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <RemedyModal
          isShowModal={this.state.isShowRemedyModal}
          dataModal={this.state.dataModal}
          toggleModal={this.toggleModal}
          sendRemedy={this.sendRemedy}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
