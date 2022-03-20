import { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookingAppointmentService } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerify: false,
      errCode: 1,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookingAppointmentService({
        token,
        doctorId,
      });
      console.log("Res", res);
      if (res && res.infor.errCode === 0) {
        this.setState({
          isVerify: true,
          errCode: 0,
        });
      } else {
        this.setState({
          isVerify: false,
          errCode: -1,
        });
      }
    }
  }

  render() {
    let { isVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-container container">
          <div>{errCode === 1 ? <span>Loading data...</span> : ""}</div>
          <div className="text-center text-danger fw-bold fs-2 mt-3">
            {isVerify ? (
              <span>Xác nhận đặt lịch khám thành công!!</span>
            ) : (
              <span>Lịch khám này đã được xác nhận hoặc không tồn tại</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
