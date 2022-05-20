import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ImgYHCT from "../../../assets/specialty/y-hoc-co-truyen.jpg";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsRedux: [],
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
  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-post/${item.id}`);
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { postsRedux } = this.state;
    console.log("State-post", this.state);
    return (
      <>
        <div className="section-container section-handbook">
          <div className="container py-4">
            <div className="section-title d-flex">
              <h1>
                <FormattedMessage id="homepage.handbook" />
              </h1>
              <div
                className="see-more"
                onClick={() => this.props.history.push("/home-list-post")}
              >
                <a href="#">
                  {" "}
                  <FormattedMessage id="homepage.all-posts" />
                </a>
              </div>
            </div>
            <Slider {...settings}>
              {postsRedux &&
                postsRedux.length > 0 &&
                postsRedux.map((item, index) => {
                  return (
                    <div
                      className="section-item"
                      onClick={() => this.handleViewDetailClinic(item)}
                      key={index}
                    >
                      <a href="#" className="d-block">
                        <img src={item.image} alt="" />
                        <p className="text-center">{item.title}</p>
                      </a>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
