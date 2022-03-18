import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  toggle = () => {
    this.props.toggleModal();
  };
  handleSaveMedicalAppointment = (e) => {
    console.log(e.target.value);
  };
  render() {
    //   console.log("data from parent :", this.props.dataTime);
    let { dataTime } = this.props;
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
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
            <FormattedMessage id="patient.extra-infor.infor-booking" />
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <ProfileDoctor doctorId={doctorId} />
              <div className="row mt-2">
                <div className="form-group col-6">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter firstName"
                    name="firstName"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.firstName}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter lastName"
                    name="lastName"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.lastName}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-12">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter address"
                    name="address"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.address}
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
              onClick={(e) => this.handleSaveMedicalAppointment(e)}
            >
              Save changes
            </Button>
            <Button onClick={() => this.toggle()} className="px-3">
              Close
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
