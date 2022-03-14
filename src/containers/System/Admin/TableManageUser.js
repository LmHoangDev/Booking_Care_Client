import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// import {
//   getAllUsers,
//   createNewUserService,
//   deleteUserService,
//   updateUserService,
// } from "../../services/userService";

// import { emitter } from "../../utils/emitter";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllUsersRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (data) => {
    this.props.fetchDeleteUserRedux(data.id);
  };
  handleEditUser = (item) => {
    this.props.handleEditUserFromParent(item);
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <div className="container">
        <table className="table table-hover w-75 mx-auto mt-5">
          <thead className="table-dark">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleEditUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchDeleteUserRedux: (id) => dispatch(actions.fetchDeleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
