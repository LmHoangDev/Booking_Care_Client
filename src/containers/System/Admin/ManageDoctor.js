import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
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

      //save doctor_infor_table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllRequiredDoctorInforRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let dataSelect = this.buildDataInput(this.props.listDoctors, "USERS");
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInput(this.props.listDoctors, "USERS");
      this.setState({
        arrDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctors !== this.props.allRequiredDoctors) {
      let { prices, payments, provinces } = this.props.allRequiredDoctors;
      let priceSelect = this.buildDataInput(prices);
      let paymentSelect = this.buildDataInput(payments);
      let provinceSelect = this.buildDataInput(provinces);
      this.setState({
        listPrice: priceSelect,
        listPayment: paymentSelect,
        listProvince: provinceSelect,
      });
      // console.log("check all required", this.props.allRequiredDoctors);
    }
  }
  buildDataInput = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : `${item.valueVi}`;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : `${item.valueEn}`;
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
    console.log("check all required", this.props.allRequiredDoctors);
    return (
      <div className="container">
        <h2 className="text-center title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </h2>
        <div className="row mt-4">
          <div className="col-6">
            <label htmlFor="doctor">
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.arrDoctors}
              id="doctor"
            />
          </div>
          <div className="col-6">
            <label htmlFor="intro-info">
              {" "}
              <FormattedMessage id="admin.manage-doctor.intro-infor" />
            </label>
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

        <div className="row mt-4">
          <div className="col-4 form-group">
            <label htmlFor="">Chọn giá</label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChange}
              options={this.state.listPrice}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Chọn phương thức thanh toán</label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChange}
              options={this.state.listPayment}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Chọn tỉnh thành</label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChange}
              options={this.state.listProvince}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Tên phòng khám</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Địa chỉ phòng khám</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Ghi chú</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="manage-doctor-edit mt-4">
          <label htmlFor="infor-detail">Thông tin chi tiết</label>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            className="mx-auto"
            value={this.state.contentMarkdown}
            id="infor-detail"
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
          {!hasOldData ? (
            <FormattedMessage id="admin.manage-doctor.add" />
          ) : (
            <FormattedMessage id="admin.manage-doctor.save" />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctors: state.admin.doctors,
    language: state.app.language,
    allRequiredDoctors: state.admin.allRequiredDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchSaveInfoDoctorRedux: (data) =>
      dispatch(actions.fetchSaveInfoDoctorStart(data)),

    fetchAllRequiredDoctorInforRedux: () =>
      dispatch(actions.fetchAllRequiredDoctorInforStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
