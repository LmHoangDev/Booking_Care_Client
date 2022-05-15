import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { fetchChangeActiveAccount } from "../../store/actions";
import * as actions from "../.././store/actions";
import { emitter } from "../../utils/emitter";
class ModelChangeActiveAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: 0,
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODEL_DATA", () => {
      this.setState({});
    });
  }
  componentDidMount() {
    if (this.props.dataFormParent && this.props.dataFormParent.isActive) {
      this.setState({
        isActive: this.props.dataFormParent.isActive,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataFormParent !== this.props.dataFormParent) {
      this.setState({
        isActive: this.props.dataFormParent.isActive,
      });
    }
  }
  toggle = () => {
    this.props.toggleModal();
  };
  //handleChange = (e) => {};
  handleSubmit = async (e) => {
    console.log(this.state);
    let isActiveValue = this.state.isActive;
    let id = this.props.dataFormParent.id;
    let data = {
      id: id,
      isActive: isActiveValue,
    };
    //console.log("data:", data);
    try {
      await this.props.fetchChangeActiveAccount(data);
    } catch (error) {
      console.log(error);
    }
    this.toggle();
  };
  handleChangeCheckbox = (e) => {
    // console.log("Value checkbox", e.target.checked);
    this.setState({
      isActive: e.target.checked ? 1 : 0,
    });
  };
  render() {
    console.log(this.state);
    console.log(this.props);
    // console.log("userinfor from parent", this.props.dataFormParent);
    return (
      <Modal
        isOpen={this.props.isShowModel}
        toggle={() => this.toggle()}
        size="lg"
        centered
        className={"modal-container"}
      >
        <ModalHeader toggle={() => this.toggle()}>
          Cập nhật người dùng
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <form className="col-12">
                <div className="form-group row w-75 m-auto">
                  <div className="col-sm-6 fs-4 fw-bold">
                    Tình trạng hoạt động
                  </div>
                  <div className="col-sm-6">
                    <div className="form-check fs-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        onChange={this.handleChangeCheckbox}
                        //defaultChecked={this.state.isActive ? false : true}
                        checked={this.state.isActive === 1 ? true : false}
                      />
                      <label className="form-check-label" htmlFor="isActive">
                        Vô hiệu hóa
                      </label>
                    </div>
                  </div>
                </div>
              </form>
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
    fetchChangeActiveAccount: (data) =>
      dispatch(actions.fetchChangeActiveAccount(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelChangeActiveAccount);
