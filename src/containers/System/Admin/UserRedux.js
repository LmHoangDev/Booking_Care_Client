import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { language, CRUD_ACTIONS } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
// import { fetchGenderStart } from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewURL: "",
      isOpen: "",

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      position: "",
      image: "",
      address: "",
      phoneNumber: "",
      role: "",

      action: "",
      userEditId: "",
    };
  }
  componentDidMount() {
    this.props.getAllGendersRedux();
    this.props.getAllPositionsRedux();
    this.props.getAllRolesRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // state redux change thì ms setstate
    if (prevProps.gendersRedux !== this.props.gendersRedux) {
      let arrGenders = this.props.gendersRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.positionsRedux !== this.props.positionsRedux) {
      let arrPositions = this.props.positionsRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      });
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      let arrRoles = this.props.rolesRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrRoles = this.props.rolesRedux;
      let arrPositions = this.props.positionsRedux;
      let arrGenders = this.props.gendersRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
        image: "",
        address: "",
        phoneNumber: "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",

        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  handleChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewURL: objectURL,
        image: file,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewURL) return;
    this.setState({
      isOpen: true,
    });
  };

  checkValidateInput = () => {
    let isvalid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isvalid = false;
        alert("Missing is required " + arrInput[i]);
        break;
      }
    }
    return isvalid;
  };

  handleChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleSaveUser = (e) => {
    e.preventDefault();
    let isValid = this.checkValidateInput();
    if (!isValid) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        address: this.state.address,
        gender: this.state.gender,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        positionId: this.state.position,
        roleId: this.state.role,
        gender: this.state.gender,
        id: this.state.userEditId,
      });
    }
  };

  handleEditUserFromParent = (data) => {
    this.setState({
      email: data.email,
      password: "HashPassWord",
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      position: data.positionId,

      image: "",
      address: data.address,
      phoneNumber: data.phoneNumber,
      role: data.roleId,
      userEditId: data.id,
      action: CRUD_ACTIONS.EDIT,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;

    let { language, isLoadingGender } = this.props;

    let {
      email,
      password,
      firstName,
      lastName,
      gender,
      position,
      image,
      address,
      phoneNumber,
      role,
    } = this.state;
    // console.log("State", this.state);

    return (
      <div className="container">
        <div className="title">Manage users redux</div>

        <form className="w-75 mx-auto" onSubmit={(e) => this.handleSaveUser(e)}>
          <div className="row mt-4">
            <div className="form-group col-md-6">
              <label htmlFor="email">
                <FormattedMessage id="manage-user.email" />
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => this.handleChangeInput(e, "email")}
                disabled={
                  this.state.action === CRUD_ACTIONS.EDIT ? true : false
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="password">
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => this.handleChangeInput(e, "password")}
                disabled={
                  this.state.action === CRUD_ACTIONS.EDIT ? true : false
                }
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="form-group col-md-4">
              <label htmlFor="firstName">
                <FormattedMessage id="manage-user.firstName" />
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => this.handleChangeInput(e, "firstName")}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="lastName">
                {" "}
                <FormattedMessage id="manage-user.lastName" />
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => this.handleChangeInput(e, "lastName")}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="phoneNumber">
                {" "}
                <FormattedMessage id="manage-user.phoneNumber" />
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => this.handleChangeInput(e, "phoneNumber")}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="form-group col-md-12">
              <label htmlFor="address">
                {" "}
                <FormattedMessage id="manage-user.address" />
              </label>
              <textarea
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                name="address"
                value={address}
                onChange={(e) => this.handleChangeInput(e, "address")}
              ></textarea>
            </div>
          </div>
          <div className="row mt-4">
            <div className="form-group col-md-3">
              <label htmlFor="gender">
                {" "}
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select
                className="form-control form-select"
                id="gender"
                value={gender}
                onChange={(e) => this.handleChangeInput(e, "gender")}
              >
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    return (
                      <option value={item.key} key={index}>
                        {language === "vi" ? item.valueVi : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="position">
                {" "}
                <FormattedMessage id="manage-user.position" />
              </label>
              <select
                className="form-control form-select"
                id="position"
                value={position}
                onChange={(e) => this.handleChangeInput(e, "position")}
              >
                {positions &&
                  positions.length > 0 &&
                  positions.map((item, index) => {
                    return (
                      <option value={item.key} key={index}>
                        {language === "vi" ? item.valueVi : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="role">
                {" "}
                <FormattedMessage id="manage-user.role" />
              </label>
              <select
                className="form-control form-select"
                id="role"
                value={role}
                onChange={(e) => this.handleChangeInput(e, "role")}
              >
                {roles &&
                  roles.length > 0 &&
                  roles.map((item, index) => {
                    return (
                      <option value={item.key} key={index}>
                        {language === "vi" ? item.valueVi : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="image" className="label-upload">
                {" "}
                <FormattedMessage id="manage-user.image" />
                <i className="fas fa-upload ml-2"></i>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                hidden
                onChange={(e) => this.handleChangeImage(e)}
              />
              <div
                className="preview-image"
                style={{ backgroundImage: `url(${this.state.previewURL})` }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
          </div>
          {this.state.isOpen && (
            <Lightbox
              mainSrc={this.state.previewURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}

          <button
            type="submit"
            className={
              this.state.action === CRUD_ACTIONS.EDIT
                ? "btn btn-warning mt-4"
                : "btn btn-primary mt-4"
            }
          >
            {this.state.action === CRUD_ACTIONS.EDIT ? (
              <FormattedMessage id="manage-user.edit" />
            ) : (
              <FormattedMessage id="manage-user.save" />
            )}
          </button>
        </form>

        <TableManageUser
          handleEditUserFromParent={this.handleEditUserFromParent}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gendersRedux: state.admin.genders,
    positionsRedux: state.admin.positions,
    rolesRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGendersRedux: () => dispatch(actions.fetchGenderStart()),
    getAllPositionsRedux: () => dispatch(actions.fetchPositionStart()),
    getAllRolesRedux: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.fetchCreateNewUser(data)),
    fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    editUserRedux: (data) => dispatch(actions.fetchEditUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
