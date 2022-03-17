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
      let { prices, payments, provinces } = this.props.allRequiredDoctors;
      let priceSelect = this.buildDataInput(prices, "PRICE");
      let paymentSelect = this.buildDataInput(payments, "PAYMENT");
      let provinceSelect = this.buildDataInput(provinces, "PROVINCE");
      this.setState({
        arrDoctors: dataSelect,
        listPrice: priceSelect,
        listPayment: paymentSelect,
        listProvince: provinceSelect,
      });
    }
    if (prevProps.allRequiredDoctors !== this.props.allRequiredDoctors) {
      let { prices, payments, provinces } = this.props.allRequiredDoctors;
      let priceSelect = this.buildDataInput(prices, "PRICE");
      let paymentSelect = this.buildDataInput(payments, "PAYMENT");
      let provinceSelect = this.buildDataInput(provinces, "PROVINCE");
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
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};

          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};

          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};

          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
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
    let { listPrice, listProvince, listPayment } = this.state;
    let res = await getDetailDoctorById(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        selectedPrice = "",
        selectedPayment = "",
        selectedProvince = "",
        paymentId = "",
        priceId = "",
        provinceId = "";
      if (res.data.Doctor_infor) {
        addressClinic = res.data.Doctor_infor.addressClinic;
        nameClinic = res.data.Doctor_infor.nameClinic;
        note = res.data.Doctor_infor.note;
        paymentId = res.data.Doctor_infor.paymentId;
        provinceId = res.data.Doctor_infor.provinceId;
        priceId = res.data.Doctor_infor.priceId;

        selectedPrice = listPrice.find(
          (item) => item && item.value === priceId
        );
        selectedPayment = listPayment.find(
          (item) => item && item.value === paymentId
        );
        selectedProvince = listProvince.find(
          (item) => item && item.value === provinceId
        );
      }
      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
        nameClinic,
        note,
        addressClinic,
        selectedProvince,
        selectedPayment,
        selectedPrice,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        nameClinic: "",
        note: "",
        addressClinic: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
      });
    }
    console.log("Response", res);
  };
  handleChangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = this.state;
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    console.log("Select onchange:", selectedOption, stateName);
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

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      addressClinic: this.state.addressClinic,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
    });
  };
  render() {
    let { hasOldData } = this.state;
    console.log("check all required", this.state);
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
              onChange={(e) => this.handleChangeText(e, "description")}
            ></textarea>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChange}
              options={this.state.listPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              value={this.state.selectedPrice}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChange}
              options={this.state.listPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              value={this.state.selectedPayment}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              // value={this.state.selectedOption}
              // onChange={this.handleChange}
              options={this.state.listProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              value={this.state.selectedProvince}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.nameClinic}
              onChange={(e) => this.handleChangeText(e, "nameClinic")}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.addressClinic}
              onChange={(e) => this.handleChangeText(e, "addressClinic")}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.note}
              onChange={(e) => this.handleChangeText(e, "note")}
            />
          </div>
        </div>

        <div className="manage-doctor-edit mt-4">
          <label htmlFor="infor-detail">
            {" "}
            <FormattedMessage id="admin.manage-doctor.infor-detail" />
          </label>
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
