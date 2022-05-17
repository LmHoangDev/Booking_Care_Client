import MarkdownIt from "markdown-it";
import { Component } from "react";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteClinicService } from "../../../services/userService";
import * as actions from "../../../store/actions";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalDeleteClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataFormParent) {
      let data = this.props.dataFormParent;

      this.setState({
        id: data.id,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataFormParent !== this.props.dataFormParent) {
      let data = this.props.dataFormParent;

      this.setState({
        id: data.id,
      });
    }
  }
  handleSubmit = async () => {
    try {
      let res = await deleteClinicService({ id: this.state.id });
      console.log("res", res);
      if (res && res.message.errCode === 0) {
        toast.success("Xoá phòng khám thành công!!");
        await this.props.fetchAllClinicsStart();
        this.toggle();
      } else {
        toast.error("Xoá phòng khám thất bại!!");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  toggle = () => {
    this.props.toggleModalDelete();
  };

  render() {
    console.log(this.props.dataFormParent);
    console.log("state", this.state);

    return (
      <Modal
        isOpen={this.props.isShowModelDelete}
        toggle={() => this.toggle()}
        size="lg"
        centered
        className={"modal-container"}
      >
        <ModalHeader toggle={() => this.toggle()}>
          Xác nhận xóa phòng khám
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 className="text-danger">Bạn có chắc muốn xóa không ?</h4>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            className="px-3"
            onClick={() => this.handleSubmit()}
          >
            Xác nhận
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
    fetchAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteClinic);
