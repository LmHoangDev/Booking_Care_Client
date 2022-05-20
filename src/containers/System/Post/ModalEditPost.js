import MarkdownIt from "markdown-it";
import { Component } from "react";
import { FormattedMessage } from "react-intl";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import {
  getAllCodeService,
  getListClinicService,
  updateClinicService,
} from "../../../services/userService";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHTML: "",
      descriptionMarkdown: "",
      title: "",

      image: "",
      id: "",
      listPostType: [],
      type: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataFormParent) {
      let data = this.props.dataFormParent;
      //   this.setState({
      //     clinic: data,
      //   });
      // console.log("sa", data);
      this.setState({
        // clinic: data,
        descriptionHTML: data.descriptionHTML,
        descriptionMarkdown: data.descriptionMarkdown,
        title: data.title,
        image: data.image,
        id: data.id,
        type: data.type,
      });
    }
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
  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // let objectURL = URL.createObjectURL(file);
      this.setState({
        // previewURL: objectURL,
        image: base64,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataFormParent !== this.props.dataFormParent) {
      let data = this.props.dataFormParent;
      //   this.setState({
      //     clinic: data,
      //   });
      // console.log("sa", data);
      this.setState({
        // clinic: data,
        descriptionHTML: data.descriptionHTML,
        descriptionMarkdown: data.descriptionMarkdown,
        title: data.title,
        image: data.image,
        id: data.id,
        type: data.type,
      });
    }
  }
  handleSubmit = async (e) => {
    // console.log("State", this.state);
    try {
      // dispatch(fetchGenderStart());
      let data = this.state;
      await this.props.fetchUpdatePost(data);
      this.toggle();
    } catch (error) {
      console.log(error);
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  toggle = () => {
    this.props.toggleModal();
    this.setState({
      descriptionHTML: "",
      descriptionMarkdown: "",
      title: "",

      image: "",
      id: "",
    });
  };
  handleChangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  onChangePostType = (e) => {
    // console.log(e.target.value);
    this.setState({
      type: e.target.value,
    });
  };
  render() {
    console.log(this.props.dataFormParent);
    console.log("state", this.state);

    return (
      <Modal
        isOpen={this.props.isShowModel}
        toggle={() => this.toggle()}
        size="lg"
        centered
        className={"modal-container"}
      >
        <ModalHeader toggle={() => this.toggle()}>
          Cập nhật bài viết
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <label htmlFor="title">Tên bài viết</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  value={this.state.title}
                  onChange={(e) => this.handleChangeText(e, "title")}
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
                  {/* <option value="" selected>
                    --Chọn loại--
                  </option> */}
                  {this.state.listPostType?.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.valueVi}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <label htmlFor="image">Hình ảnh</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  //   hidden
                  onChange={(e) => this.handleChangeImage(e)}
                />
                <br />
                <img
                  src={this.state.image}
                  alt=""
                  style={{ width: "70px", height: "50px" }}
                />
              </div>
            </div>
            <div className="manage-doctor-edit mt-4">
              <label htmlFor="description">Mô tả phòng khám</label>
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
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            className="px-3"
            onClick={(e) => this.handleSubmit(e)}
          >
            Cập nhật
          </Button>
          <Button onClick={() => this.toggle()} className="px-3">
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // listDoctors: state.admin.doctors,
    // language: state.app.language,
    // allRequiredDoctors: state.admin.allRequiredDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdatePost: (data) => dispatch(actions.fetchUpdatePost(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPost);
