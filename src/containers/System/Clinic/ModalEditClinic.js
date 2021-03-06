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
  getListClinicService,
  updateClinicService,
} from "../../../services/userService";
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHTML: "",
      descriptionMarkdown: "",
      name: "",
      address: "",
      //   image: "",
      id: "",
      //   clinic: {},
    };
  }
  componentDidMount() {
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
        name: data.name,
        address: data.address,
        // image: data.image,
        id: data.id,
      });
    }
  }
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
        name: data.name,
        address: data.address,
        // image: data.image,
        id: data.id,
      });
    }
  }
  handleSubmit = async (e) => {
    console.log("State", this.state);
    try {
      // dispatch(fetchGenderStart());
      let data = this.state;
      await this.props.fetchUpdateClinic(data);
    } catch (error) {
      console.log(error);
    }
    this.toggle();
    this.setState({
      descriptionHTML: "",
      descriptionMarkdown: "",
      name: "",
      address: "",
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
          C???p nh???t ph??ng kh??m
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <label htmlFor="name">T??n ph??ng kh??m</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.handleChangeText(e, "name")}
                />
              </div>
              <div className="col-12">
                <label htmlFor="address">?????a ch??? ph??ng kh??m</label>
                <textarea
                  cols="30"
                  rows="4"
                  className="form-control"
                  id="address"
                  value={this.state.address}
                  onChange={(e) => this.handleChangeText(e, "address")}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-4 form-group">
                <label htmlFor="image">H??nh ???nh</label>
                {/* <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  value={clinic?.image}
                /> */}
              </div>
            </div>
            <div className="manage-doctor-edit mt-4">
              <label htmlFor="description">M?? t??? ph??ng kh??m</label>
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
            C???p nh???t
          </Button>
          <Button onClick={() => this.toggle()} className="px-3">
            H???y b???
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
    fetchUpdateClinic: (data) => dispatch(actions.fetchUpdateClinic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditClinic);
