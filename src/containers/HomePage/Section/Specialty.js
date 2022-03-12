import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import ImgYHCT from "../../../assets/specialty/121232-y-hoc-co-truyen.jpg";
import ImgCS from "../../../assets/specialty/121215-cot-song.jpg";
import ImgBSGD from "../../../assets/specialty/195926-bac-si-gia-dinh.jpg";
import ImgUB from "../../../assets/specialty/195611-ung-buou.jpg";
import ImgTHHM from "../../../assets/specialty/200111-tao-hinh-ham-mat.jpg";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Specialty extends Component {
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
        <div className="specialty-container">
          <div className="container">
            <div className="specialty-title d-flex">
              <h1>Chuyên khoa phổ biến</h1>
              <div className="see-more">
                <a href="#">Xem thêm</a>
              </div>
            </div>
            <Slider {...settings}>
              <div class="specialty-item">
                <a href="#" className="d-block">
                  <img src={ImgYHCT} alt="" />
                  <p>Y học cổ truyền</p>
                </a>
              </div>
              <div class="specialty-item">
                <a href="#" className="d-block">
                  <img src={ImgCS} alt="" />
                  <p>Cột sống</p>
                </a>
              </div>
              <div class="specialty-item">
                <a href="#" className="d-block">
                  <img src={ImgBSGD} alt="" />
                  <p>Bác sĩ gia đình</p>
                </a>
              </div>
              <div class="specialty-item">
                <a href="#" className="d-block">
                  <img src={ImgUB} alt="" />
                  <p>Ung bướu</p>
                </a>
              </div>
              <div class="specialty-item">
                <a href="#" className="d-block">
                  <img src={ImgTHHM} alt="" />
                  <p>Tạo hình hàm mặt</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
