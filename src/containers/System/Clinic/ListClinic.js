import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { deleteClinicService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import "./ListClinic.scss";
import ModalDeleteClinic from "./ModalDeleteClinic";
import ModalEditClinic from "./ModalEditClinic";

class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicsRedux: [],
      filteredInfo: null,
      sortedInfo: null,
      isShowModal: false,
      clinicInfor: {},
      isShowModalDelete: false,
    };
  }
  async componentDidMount() {
    this.props.fetchAllClinicsStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listClinics !== this.props.listClinics) {
      this.setState({
        clinicsRedux: this.props.listClinics,
      });
    }
  }
  toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
      //userInfor: this.state.userInfor,
    });
  };
  toggleModalDelete = () => {
    this.setState({
      isShowModalDelete: !this.state.isShowModalDelete,
      //userInfor: this.state.userInfor,
    });
  };
  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên phòng khám",
      dataIndex: "name",
      key: "name",
      //sorter: (a, b) => a.id - b.id,
      sorter: (item1, item2) => {
        let name1 = item1.name?.trim().toLowerCase();
        let name2 = item2.name?.trim().toLowerCase();
        return name1 > name2 ? 1 : -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      //key: "address",
      render: (text, record, index) => {
        //return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;

        return (
          <>
            <span>
              {record.address.length > 60
                ? record.address.slice(0, 50) + "..."
                : record.address}
            </span>
          </>
        );
      },
      //filteredValue: firstName || null,
      // onFilter: (value, record) => record.firstName.includes(value),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      // key: "image",
      //sorter: (a, b) => a.id - b.id,
      render: (text, record, index) => {
        //return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;

        return (
          <>
            <img
              src={record.image}
              alt=""
              style={{ width: "70px", height: "50px" }}
            />
          </>
        );
      },
    },
    {
      title: "Action",
      //dataIndex: "projectName",
      key: "action",
      render: (text, record, index) => {
        //return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
        return (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => this.handleOpenModalEditClinic(record)}
            >
              <EditOutlined />
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "10px" }}
              onClick={() => this.handleOpenModalDeletePost(record)}
              // disabled={record.isActive === 0 ? true : false}
            >
              <DeleteOutlined />
            </button>
          </div>
        );
      },
    },
  ];

  handleOpenModalEditClinic = (item) => {
    this.setState({
      isShowModal: true,
      clinicInfor: item,
    });
  };
  handleOpenModalDeletePost = (item) => {
    this.setState({
      isShowModalDelete: true,
      clinicInfor: item,
    });
  };
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "ascend",
        columnKey: "id",
      },
    });
  };

  render() {
    let { language } = this.props;
    let { clinicsRedux } = this.state;
    // console.log("listClinic", listClinic);

    return (
      <>
        <div className="container">
          <h2 className="title">Quản lý phòng khám</h2>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px", marginBottom: "20px" }}
            onClick={() => this.props.history.push("/system/create-clinic")}
          >
            Thêm mới
          </button>
          <div className="row">
            <ModalEditClinic
              isShowModel={this.state.isShowModal}
              toggleModal={this.toggleModal}
              dataFormParent={this.state.clinicInfor}
            />{" "}
            <ModalDeleteClinic
              isShowModelDelete={this.state.isShowModalDelete}
              toggleModalDelete={this.toggleModalDelete}
              dataFormParent={this.state.clinicInfor}
            />
            <Table
              columns={this.columns}
              rowKey={"id"}
              dataSource={clinicsRedux}
              onChange={this.handleChange}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listClinics: state.admin.clinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListClinic)
);
