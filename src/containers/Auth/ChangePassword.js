import { Component } from "react";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { changePasswordService } from "../../services/userService";
import * as actions from "../../store/actions";
import "./ChangePassword.scss";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfoRedux: {},
      password: "",
      newPassword: "",
      reNewPassword: "",
    };
  }
  handleChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  componentDidMount() {
    if (this.props.userInfo) {
      this.setState({ userInfoRedux: this.props.userInfo });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({ userInfoRedux: this.props.userInfo });
    }
  }
  handleSubmit = async () => {
    if (this.state.newPassword !== this.state.reNewPassword) {
      alert("Mật khẩu không khớp. Mời nhập lại!");
      return;
    } else {
      try {
        let id = this.state.userInfoRedux.id;
        let password = this.state.password;
        let newPassword = this.state.newPassword;
        let res = await changePasswordService({
          id,
          password,
          newPassword,
        });
        console.log("res pass", res);
        if (res && res.errCode === 0) {
          toast.success("Thay đổi mật khẩu thành công, đăng nhập lại!");
          this.props.processLogout();
        } else {
          toast.error(res.errMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  render() {
    // console.log("User login", this.state.userInfoRedux);
    // console.log("State", this.state);
    return (
      <div className="container">
        <h2 className="title">Đổi mật khẩu</h2>
        <div className="container-change-pass mx-auto">
          <div className="row">
            <div className="col-6 ">
              <label htmlFor="password">Nhập mật khẩu cũ</label>
            </div>
            <div className="col-6 mb-3">
              {" "}
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder
                onChange={(e) => this.handleChangeInput(e, "password")}
                value={this.state.password}
              />
            </div>

            <div className="col-6">
              <label htmlFor="password">Nhập mật khẩu mới</label>
            </div>
            <div className="col-6 mb-3">
              <input
                type="password"
                name="newPassword"
                className="form-control"
                placeholder=""
                onChange={(e) => this.handleChangeInput(e, "newPassword")}
                value={this.state.newPassword}
              />
            </div>

            <div className="col-6">
              <label htmlFor="password">Nhập lại mật khẩu mới</label>
            </div>
            <div className="col-6 mb-3">
              <input
                type="password"
                name="reNewPassword"
                className="form-control"
                placeholder=""
                onChange={(e) => this.handleChangeInput(e, "reNewPassword")}
                value={this.state.reNewPassword}
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
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
