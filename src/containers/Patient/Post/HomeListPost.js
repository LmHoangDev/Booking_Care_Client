import { HomeOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import HomeFooter from "../../HomePage/HomeFooter";

class HomeListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],

      //   listDoctorsId: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllPostsStart();
    if (this.props.clinics) {
      this.setState({
        listPost: this.props.listPosts,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listPosts !== this.props.listPosts) {
      this.setState({
        listPost: this.props.listPosts,
      });
    }
  }

  render() {
    let { listPost } = this.state;
    return (
      <>
        <div className="container-list-home container">
          <div className="row">
            {" "}
            <div
              className="col-12 title text-left"
              onClick={() => this.props.history.push("/home")}
              style={{ cursor: "pointer" }}
            >
              <span>
                <HomeOutlined />
                Bài viết
              </span>
            </div>
            <div className="col-12 mt-4">
              <h5>Bài viết nổi bật</h5>
            </div>
            {listPost &&
              listPost.length > 0 &&
              listPost.map((item, index) => {
                return (
                  <div
                    className="col-12 mt-4 mb-3"
                    key={index}
                    style={{ cursor: "pointer", display: "flex" }}
                    onClick={() =>
                      this.props.history.push(`/detail-post/${item.id}`)
                    }
                  >
                    <div className="col-3">
                      <img
                        src={item.image}
                        alt=""
                        style={{ maxWidth: "200px", height: "150px" }}
                      />
                    </div>
                    <div className="col-9">
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="mt-3"
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>{" "}
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, listPosts: state.admin.posts };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPostsStart: () => dispatch(actions.fetchAllPostsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeListPost)
);
