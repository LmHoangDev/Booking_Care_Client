import { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { postCreateNewSpecialtyService } from "../../../services/userService";
import "./ManageSpecialty.scss";
import { toast } from "react-toastify";
import { withRouter } from "react-router";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
      let res = await postCreateNewSpecialtyService(this.state);
      console.log("res", res);
      if (res && res.errCode === 0) {
        toast.success("Create new specialty successfully");

        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
        this.props.history.push("/system/specialty-list");
      } else {
        toast.error("Create new specialty failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Create new specialty failed");
    }
  };

  render() {
    console.log("State", this.state);

    return (
      <>
        <div className="container">
          <div className="title">Th??m m???i chuy??n khoa</div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="name">T??n chuy??n khoa</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="T??n chuy??n khoa"
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
            className="btn btn-primary"
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty)
);
