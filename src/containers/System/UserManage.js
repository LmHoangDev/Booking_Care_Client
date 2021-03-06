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
class UserManage extends Component {
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
        <h2 className="text-center">Manager user</h2>
        <div className="my-2">
          <button
            className="btn btn-primary px-2 rounded"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Th??m m???i
          </button>
        </div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrUsers &&
              this.state.arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn btn-primary mr-1"
                        onClick={() => this.editUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => this.deleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ModalUser
          isShowModel={this.state.isShowModal}
          toggleModal={this.toggleModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isShowModalEdit && (
          <ModalEditUser
            isShowModelEdit={this.state.isShowModalEdit}
            editEditUser={this.doEditUser}
            toggleModalEdit={this.toggleModalEdit}
            currentUser={this.state.userEdit}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
