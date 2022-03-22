import { Component } from "react";
import DatePicker from "react-flatpickr";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllPatientForDoctorService } from "../../../services/userService";
import moment from "moment";
import "./ManagePatient.scss";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formatDate);
  }
  getDataPatient = async (user, formatDate) => {
    let res = await getAllPatientForDoctorService({
      doctorId: user.id,
      date: formatDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatDate);
      }
    );
  };
  render() {
    console.log("State", this.state);
    let { dataPatient } = this.state;
    return (
      <>
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
                          <button className="btn btn-primary">Xác nhận</button>
                          <button className="btn btn-warning">
                            Gửi hóa đơn
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
