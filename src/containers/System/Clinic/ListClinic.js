import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { getListClinicService } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import "./ListClinic.scss";

class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }
  async componentDidMount() {
    try {
      let res = await getListClinicService();
      if (res && res.errCode === 0) {
        this.setState({
          listClinic: res.data,
        });
      } else {
        this.setState({
          listClinic: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  getListClinic = (data) => {
    data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index++}</td>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.image}</td>
          <td>
            <button>Edit</button>
            <button>Xóa</button>
          </td>
        </tr>
      );
    });
  };
  // componentDidUpdate(prevProps, prevState) {}
  handleClick() {
    console.log("Hello");
  }
  render() {
    let { language } = this.props;
    let { listClinic } = this.state;
    console.log("listClinic", listClinic);

    return (
      <>
        <div className="container">
          <h2 className="title">Quản lý phòng khám</h2>
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-primary"
                onClick={() => this.handleClick()}
              >
                Thêm mới
              </button>
            </div>
          </div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Address</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listClinic && listClinic > 0 && this.getListClinic(listClinic)}
            </tbody>
          </table>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListClinic)
);
