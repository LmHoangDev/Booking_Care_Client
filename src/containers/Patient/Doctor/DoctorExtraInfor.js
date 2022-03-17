import { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <>Extra infor doctor</>;
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
