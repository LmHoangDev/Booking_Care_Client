import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
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

  render() {
    console.log("Check render", this.state);
    return (
      <div class="container">
        <h2 className="text-center">Manager user</h2>
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
                  <tr>
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
