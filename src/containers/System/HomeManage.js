import { Component } from "react";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import "./UserManage.scss";
class HomeManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isShowModal: false,
      isShowModalEdit: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  async getAllUsersFromReact() {
    try {
      let response = await getAllUsers("ALL");
      if (response && response.errCode === 0) {
        this.setState({
          arrUsers: response.users,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleAddNewUser = () => {
    this.setState({
      isShowModal: true,
    });
  };
  toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
    });
  };
  toggleModalEdit = () => {
    this.setState({
      isShowModalEdit: !this.state.isShowModalEdit,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isShowModal: false,
        });
        emitter.emit("EVENT_CLEAR_MODEL_DATA");
      }
    } catch (err) {
      console.log(err);
    }
  };
  deleteUser = async (data) => {
    try {
      let res = await deleteUserService(data.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  editUser = (item) => {
    this.setState({
      isShowModalEdit: true,
      userEdit: item,
    });
  };
  doEditUser = async (data) => {
    try {
      let res = await updateUserService(data);
      console.log(res.message);
      if (res && res.message.errCode === 0) {
        this.setState({
          ...this.state,
          isShowModalEdit: false,
        });

        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    // console.log("Check render", this.state);
    return (
      <div className="container">
        <h2 className="text-center title">Trang quản trị</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeManage);
