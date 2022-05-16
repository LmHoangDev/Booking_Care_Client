import MarkdownIt from "markdown-it";
import { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHTML: "",
      descriptionMarkdown: "",
      name: "",
      image: "",
      //imageBase64: "",
      id: "",
    };
  }
  componentDidMount() {
    if (this.props.dataFormParent) {
      let data = this.props.dataFormParent;
      this.setState({
        // clinic: data,
        descriptionHTML: data.descriptionHTML,
        descriptionMarkdown: data.descriptionMarkdown,
        name: data.name,
        image: data.image,
        id: data.id,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataFormParent !== this.props.dataFormParent) {
      let data = this.props.dataFormParent;

      this.setState({
        descriptionHTML: data.descriptionHTML,
        descriptionMarkdown: data.descriptionMarkdown,
        name: data.name,
        image: data.image,
        id: data.id,
      });
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
  handleSubmit = async (e) => {
    console.log("State", this.state);
    try {
      // dispatch(fetchGenderStart());
      let data = this.state;
      await this.props.fetchUpdateSpecialty(data);
    } catch (error) {
      console.log(error);
    }
    this.toggle();
    this.setState({
      descriptionHTML: "",
      descriptionMarkdown: "",
      name: "",
      image: "",
      //imageBase64: "",
      id: "",
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  toggle = () => {
    this.props.toggleModal();
  };
  handleChangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
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
          Cập nhật chuyên khoa
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <label htmlFor="name">Tên chuyên khoa</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.handleChangeText(e, "name")}
                />
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
                <img src={this.state.image} alt="" />
              </div>
            </div>
            <div className="manage-doctor-edit mt-4">
              <label htmlFor="description">Mô tả chuyên khoa</label>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdateSpecialty: (data) =>
      dispatch(actions.fetchUpdateSpecialty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditSpecialty);
