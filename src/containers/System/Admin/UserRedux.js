import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { language } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
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
      this.setState({
        genderArr: this.props.gendersRedux,
      });
    }
    if (prevProps.positionsRedux !== this.props.positionsRedux) {
      this.setState({
        positionArr: this.props.positionsRedux,
      });
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      this.setState({
        roleArr: this.props.rolesRedux,
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
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewURL) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;

    let { language, isLoadingGender } = this.props;
    return (
      <div className="container">
        <div className="title">Manage users redux</div>

        <form className="w-75 mx-auto">
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
              ></textarea>
            </div>
          </div>
          <div className="row mt-4">
            <div className="form-group col-md-3">
              <label htmlFor="gender">
                {" "}
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select className="form-control form-select" id="gender">
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
              <select className="form-control form-select" id="position">
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
              <select className="form-control form-select" id="role">
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

          <button type="submit" className="btn btn-primary mt-4">
            <FormattedMessage id="manage-user.save" />
          </button>
        </form>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGendersRedux: () => dispatch(actions.fetchGenderStart()),
    getAllPositionsRedux: () => dispatch(actions.fetchPositionStart()),
    getAllRolesRedux: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
