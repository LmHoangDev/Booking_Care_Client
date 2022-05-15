import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let { currentUser } = this.props;
    if (currentUser && !_.isEmpty(currentUser)) {
      this.setState({
        id: currentUser.id,
        email: currentUser.email,
        password: "hashPassWord",
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
      });
    }
  }
  toggle = () => {
    this.props.toggleModalEdit();
  };
  checkValidInput = () => {
    let check = true;
    let arrInput = [
      "email",
      "password",
      "email",
      "firstName",
      "lastName",
      "address",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        check = false;
        alert("Missing required " + arrInput[i]);
        break;
      }
    }
    return check;
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    let copyState = { ...this.state };
    copyState[name] = value;
    this.setState({ ...copyState });
  };
  handleSubmit = (e) => {
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.editEditUser(this.state);
    }
  };
  render() {
    // console.log(this.props);
    // console.log(this.state);
    return (
      <Modal
        isOpen={this.props.isShowModelEdit}
        toggle={() => this.toggle()}
        size="lg"
        centered
        className={"modal-container"}
      >
        <ModalHeader toggle={() => this.toggle()}>
          Cập nhật người dùng
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.email}
                  disabled
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.password}
                  disabled
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-6">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter firstName"
                  name="firstName"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.firstName}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter lastName"
                  name="lastName"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.lastName}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-12">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter address"
                  name="address"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.address}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            className="px-3"
            onClick={(e) => this.handleSubmit(e)}
          >
            Save changes
          </Button>
          <Button onClick={() => this.toggle()} className="px-3">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
