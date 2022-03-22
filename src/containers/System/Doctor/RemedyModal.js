import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { languages, CommonUtils } from "../../../utils";
import moment from "moment";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image: "",
    };
  }
  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  toggle = () => {
    this.props.toggleModal();
  };
  handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // let objectURL = URL.createObjectURL(file);
      this.setState({
        //previewURL: objectURL,
        image: base64,
      });
    }
  };
  handleSendBill = () => {
    console.log("State", this.state);
    this.props.sendRemedy(this.state);
  };
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isShowModal}
          toggle={() => this.toggle()}
          size="lg"
          centered
          className={"modal-container"}
        >
          <ModalHeader toggle={() => this.toggle()}>
            Xác nhận khám xong
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="email">Email bệnh nhân</label>
                  <input
                    type="text"
                    value={this.state.email}
                    className="form-control"
                    onChange={() => this.handleChangeInput()}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="name">Chọn file đơn thuốc</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => this.handleChangeImage(e)}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              className="px-3"
              onClick={() => this.handleSendBill()}
            >
              Send
            </Button>
            <Button onClick={() => this.toggle()} className="px-3">
              <FormattedMessage id="patient.extra-infor.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
