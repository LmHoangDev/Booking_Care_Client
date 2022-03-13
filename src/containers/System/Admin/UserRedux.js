import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { language } from "../../../utils/constant";
import * as actions from "../../../store/actions";
// import { fetchGenderStart } from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  // async componentDidMount() {
  //   try {
  //     let res = await getAllCodeService("gender");
  //     if (res && res.errCode === 0) {
  //       this.setState({
  //         genderArr: res.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  componentDidMount() {
    this.props.getAllGendersRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // state redux change thì ms setstate
    if (prevProps.gendersRedux !== this.props.gendersRedux) {
      this.setState({
        genderArr: this.props.gendersRedux,
      });
    }
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
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
                <option value="" selected>
                  Choose
                </option>
                <option value="1">Doctor</option>
                <option value="2">Doctor</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="role">
                {" "}
                <FormattedMessage id="manage-user.role" />
              </label>
              <select className="form-control form-select" id="role">
                <option value="" selected>
                  Choose
                </option>
                <option value="1">Doctor</option>
                <option value="2">Doctor</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="image">
                {" "}
                <FormattedMessage id="manage-user.image" />
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            <FormattedMessage id="manage-user.save" />
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, gendersRedux: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGendersRedux: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
