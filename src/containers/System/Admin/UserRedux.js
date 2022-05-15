import { Component } from "react";
import "react-image-lightbox/style.css";
import { connect } from "react-redux";
import TableManageUser from "./TableManageUser";
import "./UserRedux.scss";
// import { fetchGenderStart } from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // genderArr: [],
      // positionArr: [],
      // roleArr: [],
      // previewURL: "",
      // isOpen: "",
      // email: "",
      // password: "",
      // firstName: "",
      // lastName: "",
      // gender: "",
      // position: "",
      // image: "",
      // address: "",
      // phoneNumber: "",
      // role: "",
      // action: "",
      // userEditId: "",
    };
  }

  // componentDidMount() {
  //   this.props.getAllGendersRedux();
  //   this.props.getAllPositionsRedux();
  //   this.props.getAllRolesRedux();
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   // state redux change thì ms setstate
  //   if (prevProps.gendersRedux !== this.props.gendersRedux) {
  //     let arrGenders = this.props.gendersRedux;
  //     this.setState({
  //       genderArr: arrGenders,
  //       gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
  //     });
  //   }
  //   if (prevProps.positionsRedux !== this.props.positionsRedux) {
  //     let arrPositions = this.props.positionsRedux;
  //     this.setState({
  //       positionArr: arrPositions,
  //       position:
  //         arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
  //     });
  //   }
  //   if (prevProps.rolesRedux !== this.props.rolesRedux) {
  //     let arrRoles = this.props.rolesRedux;
  //     this.setState({
  //       roleArr: arrRoles,
  //       role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
  //     });
  //   }
  //   if (prevProps.listUsers !== this.props.listUsers) {
  //     let arrRoles = this.props.rolesRedux;
  //     let arrPositions = this.props.positionsRedux;
  //     let arrGenders = this.props.gendersRedux;
  //     this.setState({
  //       email: "",
  //       password: "",
  //       firstName: "",
  //       lastName: "",
  //       gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
  //       position:
  //         arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
  //       image: "",
  //       address: "",
  //       phoneNumber: "",
  //       role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",

  //       action: CRUD_ACTIONS.CREATE,
  //       previewURL: "",
  //     });
  //   }
  // }
  // handleChangeImage = async (e) => {
  //   let data = e.target.files;
  //   let file = data[0];
  //   if (file) {
  //     let base64 = await CommonUtils.getBase64(file);
  //     let objectURL = URL.createObjectURL(file);
  //     this.setState({
  //       previewURL: objectURL,
  //       image: base64,
  //     });
  //   }
  // };
  // openPreviewImage = () => {
  //   if (!this.state.previewURL) return;
  //   this.setState({
  //     isOpen: true,
  //   });
  // };

  // checkValidateInput = () => {
  //   let isvalid = true;
  //   let arrInput = [
  //     "email",
  //     "password",
  //     "firstName",
  //     "lastName",
  //     "phoneNumber",
  //     "address",
  //   ];
  //   for (let i = 0; i < arrInput.length; i++) {
  //     if (!this.state[arrInput[i]]) {
  //       isvalid = false;
  //       alert("Missing is required " + arrInput[i]);
  //       break;
  //     }
  //   }
  //   return isvalid;
  // };

  // handleChangeInput = (e, id) => {
  //   let copyState = { ...this.state };
  //   copyState[id] = e.target.value;
  //   this.setState({
  //     ...copyState,
  //   });
  // };
  // handleSaveUser = (e) => {
  //   e.preventDefault();
  //   let isValid = this.checkValidateInput();
  //   if (!isValid) return;
  //   let { action } = this.state;
  //   if (action === CRUD_ACTIONS.CREATE) {
  //     this.props.createNewUser({
  //       email: this.state.email,
  //       password: this.state.password,
  //       firstName: this.state.firstName,
  //       lastName: this.state.lastName,
  //       phoneNumber: this.state.phoneNumber,
  //       roleId: this.state.role,
  //       positionId: this.state.position,
  //       address: this.state.address,
  //       gender: this.state.gender,
  //       image: this.state.image,
  //     });
  //   }
  //   if (action === CRUD_ACTIONS.EDIT) {
  //     this.props.editUserRedux({
  //       firstName: this.state.firstName,
  //       lastName: this.state.lastName,
  //       address: this.state.address,
  //       phoneNumber: this.state.phoneNumber,
  //       positionId: this.state.position,
  //       roleId: this.state.role,
  //       gender: this.state.gender,
  //       id: this.state.userEditId,
  //       image: this.state.image,
  //     });
  //   }
  // };

  // handleEditUserFromParent = (data) => {
  //   let imageBase64 = "";
  //   if (data.image) {
  //     imageBase64 = Buffer.from(data.image, "base64").toString("binary");
  //   }
  //   this.setState({
  //     email: data.email,
  //     password: "HashPassWord",
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     gender: data.gender,
  //     position: data.positionId,

  //     image: "",
  //     address: data.address,
  //     phoneNumber: data.phoneNumber,
  //     role: data.roleId,
  //     userEditId: data.id,
  //     action: CRUD_ACTIONS.EDIT,
  //     previewURL: imageBase64,
  //   });
  // };
  render() {
    // let genders = this.state.genderArr;
    // let positions = this.state.positionArr;
    // let roles = this.state.roleArr;

    // let { language } = this.props;

    // let {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    //   gender,
    //   position,
    //   image,
    //   address,
    //   phoneNumber,
    //   role,
    // } = this.state;
    // console.log("State", this.state);

    return (
      <div className="container">
        <div className="title">Quản lý người dùng</div>

        <TableManageUser
        //handleEditUserFromParent={this.handleEditUserFromParent}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // language: state.app.language,
    // gendersRedux: state.admin.genders,
    // positionsRedux: state.admin.positions,
    // rolesRedux: state.admin.roles,
    // listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllGendersRedux: () => dispatch(actions.fetchGenderStart()),
    // getAllPositionsRedux: () => dispatch(actions.fetchPositionStart()),
    // getAllRolesRedux: () => dispatch(actions.fetchRoleStart()),
    // createNewUser: (data) => dispatch(actions.fetchCreateNewUser(data)),
    // fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    // editUserRedux: (data) => dispatch(actions.fetchEditUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
