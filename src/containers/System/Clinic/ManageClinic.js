import MarkdownIt from "markdown-it";
import { Component } from "react";
import Lightbox from "react-image-lightbox";
import MdEditor from "react-markdown-editor-lite";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { postCreateNewClinicService } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ManageClinic.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewURL: "",
      image: "",
      isOpen: "",
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}
  // handleChangeImage = async (e) => {
  //   let data = e.target.files;
  //   let file = data[0];
  //   if (file) {
  //     let base64 = await CommonUtils.getBase64(file);
  //     //  let objectURL = URL.createObjectURL(file);
  //     this.setState({
  //       //previewURL: objectURL,
  //       imageBase64: base64,
  //     });
  //   }
  // };
  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewURL: objectURL,
        imageBase64: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewURL) return;
    this.setState({
      isOpen: true,
    });
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
          <h2 className="title">Th??m ph??ng kh??m</h2>
          <div className="row">
            <div className="col-6">
              <label htmlFor="name">T??n ph??ng kh??m</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="T??n ph??ng kh??m"
                onChange={(e) => this.handleChangeInput(e)}
                value={this.state.name}
              />
            </div>
            <div className="col-6">
              <label htmlFor="image" className="label-upload">
                H??nh ???nh
                <i className="fas fa-upload ml-2"></i>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                hidden
                onChange={(e) => this.handleChangeImage(e)}
              />
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewURL})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
              {this.state.isOpen && (
                <Lightbox
                  mainSrc={this.state.previewURL}
                  //style={{ zIndex: 9999 }}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                />
              )}
              {/* <div
                className="preview-image"
                style={{ backgroundImage: `url(${this.state.previewURL})` }}
                onClick={() => this.openPreviewImage()}
              ></div> */}
            </div>
            <div className="col-6">
              <label htmlFor="name">?????a ch??? ph??ng kh??m</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="?????a ch??? ph??ng kh??m"
                onChange={(e) => this.handleChangeInput(e)}
                value={this.state.address}
              />
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="description">M?? t???</label>
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
            className="btn btn-primary mb-5"
            onClick={() => this.handleSaveInfor()}
          >
            T???o m???i
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
  return {
    fetchAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
