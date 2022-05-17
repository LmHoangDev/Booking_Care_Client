import { Component } from "react";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { getAllUsers } from "../../services/userService";

import * as actions from "../../store/actions";
import { CommonUtils } from "../../utils";
import "./ChangePassword.scss";
class ChangeInforPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfoRedux: {},
      email: "",
      address: "",
      gender: "",
      phoneNumber: "",
      image: "",
      userDetailInfor: {},
    };
  }
  handleChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  async componentDidMount() {
    if (this.props.userInfo) {
      this.setState({ userInfoRedux: this.props.userInfo });
      try {
        let res = await getAllUsers(this.props.userInfo.id);
        console.log("res detail", res);
        if (res && res.errCode === 0) {
          this.setState({
            userDetailInfor: res.users,
            email: res.users.email,
            phoneNumber: res.users.phoneNumber,
            gender: res.users.gender,
            image: res.users.image,
            address: res.users.address,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({ userInfoRedux: this.props.userInfo });
      try {
        let res = await getAllUsers(this.props.userInfo.id);
        console.log("res detail", res);
        if (res && res.errCode === 0) {
          this.setState({
            userDetailInfor: res.users,
            email: res.users.email,
            phoneNumber: res.users.phoneNumber,
            gender: res.users.gender,
            image: res.users.image,
            address: res.users.address,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // let objectURL = URL.createObjectURL(file);
      this.setState({
        // previewURL: objectURL,
        image: base64,
      });
    }
  };
  handleSubmit = async () => {};
  toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  render() {
    console.log("User login", this.state.image);
    // console.log("State", this.state);
    return (
      <div className="container mt-5">
        <h2 className="title">Cập nhật thông tin cá nhân</h2>
        <div className="container-change-pass mx-auto">
          <div className="row">
            <div className="col-6 ">
              <label htmlFor="email">Email</label>
            </div>
            <div className="col-6 mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder
                // onChange={(e) => this.handleChangeInput(e, "email")}
                value={this.state.email}
                disabled
              />
            </div>

            <div className="col-6">
              <label htmlFor="address">Địa chỉ</label>
            </div>
            <div className="col-6 mb-3">
              <input
                type="address"
                name="address"
                className="form-control"
                placeholder=""
                onChange={(e) => this.handleChangeInput(e, "address")}
                value={this.state.address}
              />
            </div>
            <div className="col-6">
              <label htmlFor="gender">Giới tính</label>
            </div>
            <div className="col-6 mb-3">
              <input
                type="gender"
                name="gender"
                className="form-control"
                placeholder=""
                onChange={(e) => this.handleChangeInput(e, "gender")}
                value={this.state.gender}
              />
            </div>
            <div className="col-6">
              <label htmlFor="password">Số điện thoại</label>
            </div>
            <div className="col-6 mb-3">
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                placeholder=""
                onChange={(e) => this.handleChangeInput(e, "phoneNumber")}
                value={this.state.phoneNumber}
              />
            </div>
            <div className="col-12 text-center">
              <button
                className="btn btn-primary col-3"
                onClick={() => this.handleSubmit()}
              >
                Cập nhật
              </button>
              <button
                className="btn btn-danger col-3 ml-2"
                style={{ marginLeft: "60px" }}
                onClick={() => this.props.history.push("/system/home-manage")}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { processLogout: () => dispatch(actions.processLogout()) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangeInforPersonal)
);
