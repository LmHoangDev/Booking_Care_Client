import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { languages } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { FormattedMessage } from "react-intl";
class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}
          </span>
          <span
            className={language === "vi" ? "language-vi active" : "language-vi"}
            onClick={() => this.changeLanguage(languages.VI)}
          >
            VN
          </span>
          <span
            className={language === "en" ? "language-en active" : "language-en"}
            onClick={() => this.changeLanguage(languages.EN)}
          >
            EN
          </span>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
