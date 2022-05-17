import MarkdownIt from "markdown-it";
import { Component } from "react";
import Lightbox from "react-image-lightbox";
import MdEditor from "react-markdown-editor-lite";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  postCreateNewClinicService,
  postCreateNewPostService,
} from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class PageAddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewURL: "",
      type: "",
      image: "",
      isOpen: "",
      listPostType: [],
    };
  }
  async componentDidMount() {
    try {
      let resPost = await getAllCodeService("POST");
      // console.log("res", res, resProvince);
      if (resPost && resPost.errCode === 0) {
        this.setState({ listPostType: resPost.data });
      } else {
        this.setState({
          listPostType: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        image: base64,
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
      let res = await postCreateNewPostService(this.state);
      console.log("res", res);
      if (res && res.errCode === 0) {
        toast.success("Create new post successfully");
        this.setState({
          title: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          previewURL: "",
          type: "",
          image: "",
        });
        this.props.history.push("/system/post-list");
      } else {
        toast.error("Create new post failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Create new post failed");
    }
  };
  onChangePostType = (e) => {
    console.log(e.target.value);
    this.setState({
      type: e.target.value,
    });
  };
  render() {
    console.log("State", this.state);
    // let { language } = this.props;

    return (
      <>
        <div className="container">
          <h2 className="title">Thêm bài viết</h2>
          <div className="row">
            <div className="col-12">
              <label htmlFor="name">Tên bài viết</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Tên bài viết"
                onChange={(e) => this.handleChangeInput(e)}
                value={this.state.title}
              />
            </div>
            <div className="col-6 mt-4">
              <label htmlFor="name">Loại bài viết</label>
              <select
                className="form-select form-select-sm"
                id="type"
                onChange={(e) => this.onChangePostType(e)}
                value={this.state.type}
              >
                <option value="" selected>
                  --Chọn loại--
                </option>
                {this.state.listPostType?.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {item.valueVi}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6 mt-4">
              <label htmlFor="image" className="label-upload">
                Hình ảnh
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
            className="btn btn-primary mb-5"
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
  return {
    fetchAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageAddPost)
);
