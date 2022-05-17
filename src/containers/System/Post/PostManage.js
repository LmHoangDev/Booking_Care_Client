import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import ModalDeletePost from "./ModalDeletePost";
import ModalEditPost from "./ModalEditPost";
import "./PostManage.scss";
class PostManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsRedux: [],
      filteredInfo: null,
      sortedInfo: null,
      isShowModal: false,
      isShowModalDelete: false,
      postInfor: {},
    };
  }

  async componentDidMount() {
    this.props.fetchAllPostsStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listPosts !== this.props.listPosts) {
      this.setState({
        postsRedux: this.props.listPosts,
      });
    }
  }

  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      //sorter: (a, b) => a.id - b.id,
      sorter: (item1, item2) => {
        let title1 = item1.title?.trim().toLowerCase();
        let title2 = item2.title?.trim().toLowerCase();
        return title1 > title2 ? 1 : -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Loại bài viết",
      dataIndex: "type",
      render: (text, record, index) => {
        return (
          <>
            {record.type === "PS1" ? (
              <span>Cẩm nang</span>
            ) : (
              <span>Thường</span>
            )}
          </>
        );
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      //key: "address",
      render: (text, record, index) => {
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
              onClick={() => this.handleOpenModalEditPost(record)}
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
  handleAddNewPost = () => {
    this.props.history.push("/system/create-post");
  };
  handleDeletePost = (item) => {};
  handleOpenModalEditPost = (item) => {
    this.setState({
      isShowModal: true,
      postInfor: item,
    });
  };
  handleOpenModalDeletePost = (item) => {
    this.setState({
      isShowModalDelete: true,
      postInfor: item,
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
    console.log("Check post", this.state);
    let { postsRedux } = this.state;
    return (
      <div className="container">
        <h2 className="text-center title">Quản lý bài viết</h2>
        <div className="my-2">
          <button
            className="btn btn-primary px-2 rounded"
            onClick={() => this.handleAddNewPost()}
          >
            <i className="fas fa-plus"></i> Thêm mới
          </button>
        </div>
        <ModalEditPost
          isShowModel={this.state.isShowModal}
          toggleModal={this.toggleModal}
          dataFormParent={this.state.postInfor}
        />
        <ModalDeletePost
          isShowModelDelete={this.state.isShowModalDelete}
          toggleModalDelete={this.toggleModalDelete}
          dataFormParent={this.state.postInfor}
        />
        <Table
          columns={this.columns}
          rowKey={"id"}
          dataSource={postsRedux}
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
    language: state.app.language,
    listPosts: state.admin.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPostsStart: () => dispatch(actions.fetchAllPostsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostManage)
);
