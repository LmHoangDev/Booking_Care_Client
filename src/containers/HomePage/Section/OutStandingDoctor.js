import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import BDDBS from "../../../assets/outstanding-doctor/103848anh-dai-dien-bs.jpg";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutStandingDoctor extends Component {
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
        <div className="section-container outstanding-doctor">
          <div className="container py-4">
            <div className="section-title d-flex">
              <h1>Bác sĩ nổi bật tuần qua</h1>
              <div className="see-more">
                <a href="#">Tìm kiếm</a>
              </div>
            </div>
            <Slider {...settings}>
              <div class="section-item">
                <a href="#">
                  <img src={BDDBS} alt="" />
                  <h3>Thạc sĩ, Bác sĩ Chuyên khoa II Dương Minh Trí</h3>
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#">
                  <img src={BDDBS} alt="" />
                  <h3>Thạc sĩ, Bác sĩ Chuyên khoa II Dương Minh Trí</h3>
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#">
                  <img src={BDDBS} alt="" />
                  <h3>Thạc sĩ, Bác sĩ Chuyên khoa II Dương Minh Trí</h3>
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#">
                  <img src={BDDBS} alt="" />
                  <h3>Thạc sĩ, Bác sĩ Chuyên khoa II Dương Minh Trí</h3>
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#">
                  <img src={BDDBS} alt="" />
                  <h3>Thạc sĩ, Bác sĩ Chuyên khoa II Dương Minh Trí</h3>
                  <p>Bệnh viện thanh nhàn</p>
                </a>
              </div>
              <div class="section-item">
                <a href="#">
                  <img src={BDDBS} alt="" />
                  <h3>Thạc sĩ, Bác sĩ Chuyên khoa II Dương Minh Trí</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
