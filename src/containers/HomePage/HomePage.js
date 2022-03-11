import { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";

class HomePage extends Component {
  render() {
    return (
      <>
        <div>
          <HomeHeader />
        </div>
        Hello home page
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
