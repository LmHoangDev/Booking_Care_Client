import { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import {
  deleteSpecialtyService,
  postCreateNewSpecialtyService,
} from "../../../services/userService";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { withRouter } from "react-router";
import ModalEditSpecialty from "./ModalEditSpecialty";
import ModalDeleteSpecialty from "./ModalDeleteSpecialty";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtiesRedux: [],
      filteredInfo: null,
      sortedInfo: null,
      isShowModal: false,
      specialtyInfor: {},
      isShowModalDelete: false,
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
      title: "Tên chuyên khoa",
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
      title: "Hình ảnh",
      dataIndex: "image",
      //key: "address",
      render: (text, record, index) => {
        //return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;

        return (
          <>
            <img
              src={record.image}
              alt="..."
              style={{ width: "50px", height: "50px;" }}
            />
          </>
        );
      },
      //filteredValue: firstName || null,
      // onFilter: (value, record) => record.firstName.includes(value),
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
              onClick={() => this.handleOpenModalEditSpecialties(record)}
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
  componentDidMount() {
    this.props.fetchAllSpecialtiesStart();
  }
  handleOpenModalDeletePost = (item) => {
    this.setState({
      isShowModalDelete: true,
      specialtyInfor: item,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listSpecialties !== this.props.listSpecialties) {
      this.setState({
        specialtiesRedux: this.props.listSpecialties,
      });
    }
  }
  handleOpenModalEditSpecialties = (item) => {
    this.setState({
      isShowModal: true,
      specialtyInfor: item,
    });
  };
  toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
      //userInfor: this.state.userInfor,
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

  // handleDeleteSpecialty = async (item) => {
  //   try {
  //     let res = await deleteSpecialtyService({ id: +item.id });
  //     //console.log("res", res);
  //     if (res && res.message.errCode === 0) {
  //       toast.success("Xoá chuyên khoa thành công!!");
  //       await this.props.fetchAllSpecialtiesStart();
  //     } else {
  //       toast.error("Xoá chuyên khoa thất bại!!");
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };
  toggleModalDelete = () => {
    this.setState({
      isShowModalDelete: !this.state.isShowModalDelete,
      //userInfor: this.state.userInfor,
    });
  };
  render() {
    //console.log("State", this.state);
    let { specialtiesRedux } = this.state;
    return (
      <>
        <div className="container">
          <div className="title">Quản lý chuyên khoa</div>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px", marginBottom: "20px" }}
            onClick={() => this.props.history.push("/system/specialty-manage")}
          >
            Thêm mới
          </button>
          <div className="row">
            <ModalEditSpecialty
              isShowModel={this.state.isShowModal}
              toggleModal={this.toggleModal}
              dataFormParent={this.state.specialtyInfor}
            />
            <ModalDeleteSpecialty
              isShowModelDelete={this.state.isShowModalDelete}
              toggleModalDelete={this.toggleModalDelete}
              dataFormParent={this.state.specialtyInfor}
            />
            <Table
              columns={this.columns}
              rowKey={"id"}
              dataSource={specialtiesRedux}
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
    listSpecialties: state.admin.specialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtiesStart: () =>
      dispatch(actions.fetchAllSpecialtiesStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListSpecialty)
);
