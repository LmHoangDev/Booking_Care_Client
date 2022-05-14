import { Component } from "react";
import { connect } from "react-redux";
import "./PostManage.scss";
class PostManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    // console.log("Check render", this.state);
    return (
      <div className="container">
        <h2 className="text-center">Manager post</h2>
        <div className="my-2">
          <button
            className="btn btn-primary px-2 rounded"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Thêm mới
          </button>
        </div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManage);
