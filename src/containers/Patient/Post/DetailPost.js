import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailPostByIdService } from "../../../services/userService";
import HomeFooter from "../../HomePage/HomeFooter";
// import { Redirect, Route, Switch } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";

class DetailPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailPost: {},
    };
  }
  async componentDidMount() {
    console.log("Id", this.props.match.params.id);
    try {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id
      ) {
        let res = await getDetailPostByIdService(this.props.match.params.id);
        console.log("res", res);
        if (res && res.errCode === 0) {
          this.setState({
            detailPost: res.data,
          });
        } else {
          this.setState({
            detailPost: {},
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { language } = this.props;
    let { detailPost } = this.state;
    console.log("State", this.state);

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <>
          <div className="container">
            <h2 className="title">{detailPost.title}</h2>
            <img
              src={detailPost.image}
              alt=""
              style={{
                width: "1024px",
                height: "300px",
                marginLeft: "150px",
                marginBottom: "20px",
              }}
            />
            {detailPost && detailPost.descriptionHTML && (
              <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: detailPost.descriptionHTML,
                }}
              ></div>
            )}
          </div>
        </>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);
