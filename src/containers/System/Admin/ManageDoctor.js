import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailDoctorById } from "../../../services/userService";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: null,
      description: "",

      arrDoctors: [],

      hasOldData: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let dataSelect = this.buildDataInput(this.props.listDoctors);
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInput(this.props.listDoctors);
      this.setState({
        arrDoctors: dataSelect,
      });
    }
  }
  buildDataInput = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === languages.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleEditorChange = ({ html, text }) => {
    // console.log("handleEditorChange", html, text);
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailDoctorById(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    console.log("Response", res);
  };
  handleChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleSaveMarkdown = () => {
    let { hasOldData } = this.state;
    console.log("State :", this.state);
    this.props.fetchSaveInfoDoctorRedux({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };
  render() {
    let { hasOldData } = this.state;
    return (
      <div className="container">
        <h2 className="text-center title">Manage Doctor</h2>
        <div className="row mt-4">
          <div className="col-6">
            <label htmlFor="doctor">Chọn bác sĩ</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.arrDoctors}
              id="doctor"
            />
          </div>
          <div className="col-6">
            <label htmlFor="intro-info">Thông tin giới thiệu</label>
            <textarea
              cols="30"
              rows="8"
              className="form-control"
              id="intro-info"
              value={this.state.description}
              onChange={(e) => this.handleChangeDescription(e)}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-edit mt-4">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            className="mx-auto"
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            !hasOldData
              ? "btn btn-primary text-light my-4"
              : "btn btn-warning text-dark my-4"
          }
          onClick={() => this.handleSaveMarkdown()}
        >
          {!hasOldData ? "Tạo thông tin" : "Lưu thông tin"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctors: state.admin.doctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchSaveInfoDoctorRedux: (data) =>
      dispatch(actions.fetchSaveInfoDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
