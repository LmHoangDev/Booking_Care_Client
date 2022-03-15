import { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";
import "./HomePage.scss";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
class HomePage extends Component {
  render() {
    return (
      <>
        <HomeHeader isShowBanner={true} />
        <Specialty />
        <MedicalFacility />
        <OutStandingDoctor />
        <HandBook />
        <About />
        <HomeFooter />
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
