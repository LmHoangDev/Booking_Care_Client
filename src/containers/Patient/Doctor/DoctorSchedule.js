import { Component } from "react";
import { connect } from "react-redux";
// import { Redirect, Route, Switch } from "react-router-dom";
import moment from "moment";
import { languages } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import localization from "moment/locale/vi";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }
  setArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = [];
      if (language === languages.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }

    this.setState({
      allDays: arrDate,
    });
  };
  async componentDidMount() {
    let { language } = this.props;
    this.setArrDays(language);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setArrDays(this.props.language);
    }
  }
  handleChangeTime = async (e) => {
    console.log("value time", e.target.value);
    let date = e.target.value;
    let doctorId = this.props.doctorIdFromParent;
    let res = await getScheduleDoctorByDateService(doctorId, date);
    console.log("res", res);
  };
  render() {
    let { language } = this.props;
    let { allDays } = this.state;

    return (
      <>
        <select
          name="times"
          className="form-select w-25"
          onChange={(e) => this.handleChangeTime(e)}
        >
          {allDays &&
            allDays.length > 0 &&
            allDays.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
        </select>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
