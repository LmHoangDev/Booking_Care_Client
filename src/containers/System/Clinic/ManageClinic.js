import MarkdownIt from "markdown-it";
import { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { postCreateNewClinicService } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import "./ManageClinic.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}
  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //  let objectURL = URL.createObjectURL(file);
      this.setState({
        //previewURL: objectURL,
        imageBase64: base64,
      });
    }
  };
  handleChangeInput = (e) => {
    let { name, value } = e.target;
    let stateCopy = { ...this.state };
    stateCopy[name] = value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    // console.log("handleEditorChange", html, text);
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleSaveInfor = async () => {
    try {
      let res = await postCreateNewClinicService(this.state);
      console.log("res", res);
      if (res && res.errCode === 0) {
        toast.success("Create new clinic successfully");
        this.setState({
          name: "",
          address: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
      } else {
        toast.error("Create new clinic failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Create new clinic failed");
    }
  };

  render() {
    console.log("State", this.state);
    let { language } = this.props;

    return (
      <>
        <div className="container">
          <h2 className="title">Create Clinic</h2>
          <div className="row">
            <div className="col-6">
              <label htmlFor="name">Tên phòng khám</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Tên phòng khám"
                onChange={(e) => this.handleChangeInput(e)}
                value={this.state.name}
              />
            </div>
            <div className="col-6">
              <label htmlFor="image" className="label-upload">
                Hình ảnh
                <i className="fas fa-upload ml-2"></i>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                // hidden
                onChange={(e) => this.handleChangeImage(e)}
                // value={this.state.imageBase64}
              />
              {/* <div
                className="preview-image"
                style={{ backgroundImage: `url(${this.state.previewURL})` }}
                onClick={() => this.openPreviewImage()}
              ></div> */}
            </div>
            <div className="col-6">
              <label htmlFor="name">Địa chỉ phòng khám</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Địa chỉ phòng khám"
                onChange={(e) => this.handleChangeInput(e)}
                value={this.state.address}
              />
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="description">Mô tả</label>
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                className="mx-auto"
                value={this.state.descriptionMarkdown}
                id="description"
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.handleSaveInfor()}
          >
            Tạo mới
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
