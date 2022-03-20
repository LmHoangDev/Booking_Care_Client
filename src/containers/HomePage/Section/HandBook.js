import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ImgYHCT from "../../../assets/specialty/y-hoc-co-truyen.jpg";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="section-container section-handbook">
          <div className="container py-4">
            <div className="section-title d-flex">
              <h1>
                <FormattedMessage id="homepage.handbook" />
              </h1>
              <div className="see-more">
                <a href="#">
                  {" "}
                  <FormattedMessage id="homepage.all-posts" />
                </a>
              </div>
            </div>
            <Slider {...settings}>
              <div className="section-item">
                <a href="#" className="d-block">
                  <img src={ImgYHCT} alt="" />
                  <p>Y học cổ truyền</p>
                </a>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
