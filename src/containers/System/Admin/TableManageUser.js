import { Component } from "react";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Table } from "antd";
import * as actions from "../../../store/actions";
import ModelChangeActiveAccount from "../ModelChangeActiveAccount";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      filteredInfo: null,
      sortedInfo: null,
      isShowModal: false,

      userInfor: {},
    };
  }
  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      //sorter: (a, b) => a.id - b.id,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (item1, item2) => {
        let firstName1 = item1.firstName?.trim().toLowerCase();
        let firstName2 = item2.firstName?.trim().toLowerCase();
        return firstName1 > firstName2 ? 1 : -1;
      },
      sortDirections: ["descend", "ascend"],
      //filteredValue: firstName || null,
      // onFilter: (value, record) => record.firstName.includes(value),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      //sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      //sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      //sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Role",
      dataIndex: "roleId",
      // key: "roleId",
      //sorter: (a, b) => a.id - b.id,
      render: (text, record, index) => {
        //return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
        return (
          <span>
            {record.roleId === "R1"
              ? "Quản trị viên"
              : record.roleId === "R2"
              ? "Bác sĩ"
              : "Bệnh nhân"}
          </span>
        );
      },
      filters: [
        {
          text: "Quản trị viên",
          value: "R1",
        },
        {
          text: "Bác sĩ",
          value: "R2",
        },
        {
          text: "Bệnh nhân",
          value: "R3",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.roleId.indexOf(value) === 0,
      sorter: (a, b) => a.roleId.length - b.roleId.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "isActive",
      sorter: (a, b) => a.isActive - b.isActive,
      sortDirections: ["descend", "ascend"],

      render: (text, record, index) => {
        //return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
        return (
          <span>
            {record.isActive === 0 ? (
              <span style={{ color: "#519259", fontWeight: "bold" }}>
                Hoạt động
              </span>
            ) : (
              <span style={{ color: "#F32424", fontWeight: "bold" }}>
                Không hoạt động
              </span>
            )}
          </span>
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
              onClick={() => this.handleChangeActiveAccount(record)}
            >
              <EditOutlined />
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "10px" }}
              onClick={() => this.handleDeleteUser(record)}
              disabled={record.isActive === 0 ? true : false}
            >
              <DeleteOutlined />
            </button>
          </div>
        );
      },
    },
  ];
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };
  toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
      //userInfor: this.state.userInfor,
    });
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
  componentDidMount() {
    this.props.fetchAllUsersRedux();
    this.setState({
      // filteredInfo = filteredInfo || {}
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (data) => {
    this.props.fetchDeleteUserRedux(data.id);
  };
  handleChangeActiveAccount = (item) => {
    this.setState({
      isShowModal: true,
      userInfor: item,
    });
    // console.log("item", item);
  };
  handleOpenPageAddNew = () => {
    this.props.history.push("/system/create-account");
  };
  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  render() {
    let arrUsers = this.state.usersRedux;
    // let { sortedInfo, filteredInfo } = this.state;
    // sortedInfo = sortedInfo || {};
    // filteredInfo = filteredInfo || {};
    //console.log(this.state);
    return (
      <div className="container">
        <button
          className="btn btn-primary"
          onClick={() => this.handleOpenPageAddNew()}
          style={{ marginLeft: "10px", marginBottom: "20px" }}
        >
          Thêm mới
        </button>
        <ModelChangeActiveAccount
          isShowModel={this.state.isShowModal}
          toggleModal={this.toggleModal}
          //createNewUser={this.createNewUser}
          dataFormParent={this.state.userInfor}
        />
        <Table
          columns={this.columns}
          rowKey={"id"}
          dataSource={arrUsers}
          onChange={this.handleChange}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15"],
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchDeleteUserRedux: (id) => dispatch(actions.fetchDeleteUserStart(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableManageUser)
);
