import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { changeLanguageApp } from "../../store/actions";
class HomeFooter extends Component {
  render() {
    return (
      <>
        <footer className="home-footer">
          <div className="container">Hello footer</div>
        </footer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
