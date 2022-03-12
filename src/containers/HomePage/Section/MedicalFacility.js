import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import imgBVTN from "../../../assets/medical-facility/082317benh-vien-thanh-nhan.jpg";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="section-container medical-facility">
          <div className="container py-4">
            <div className="section-title d-flex">
              <h1>Cơ sở y tế nổi bật</h1>
              <div className="see-more">
                <a href="#">Tìm kiếm</a>
              </div>
            </div>
            <Slider {...settings}>
              <div class="section-item">
                <a href="#" className="d-block">
                  <img src={imgBVTN} alt="" />
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#" className="d-block">
                  <img src={imgBVTN} alt="" />
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#" className="d-block">
                  <img src={imgBVTN} alt="" />
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#" className="d-block">
                  <img src={imgBVTN} alt="" />
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#" className="d-block">
                  <img src={imgBVTN} alt="" />
                  <p>Bệnh viện thanh nhàn</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
