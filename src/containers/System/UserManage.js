import { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers, createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
import "./UserManage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isShowModal: false,
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
        console.log(response.users);
      }
      console.log(response.users);
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
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    console.log("Check render", this.state);
    return (
      <div class="container">
        <h2 className="text-center">Manager user</h2>
        <div className="my-2">
          <button
            className="btn btn-primary px-2 rounded"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Thêm mới
          </button>
        </div>
        <table class="table table-dark table-hover">
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
                      <button className="btn btn-primary mr-1">edit</button>
                      <button className="btn btn-danger ml-2">delete</button>
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
