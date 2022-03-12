import { Component } from "react";
import { connect } from "react-redux";
import AboutBKC from "../../../assets/about/about-booking-care.PNG";
class About extends Component {
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
        <div className="section-container section-about">
          <div className="container py-4">
            <div className="section-title d-flex">
              <h1>Truyền thông nói về BookingCare</h1>
              <div className="see-more">
                <a href="#">Tất cả bài viết</a>
              </div>
            </div>
            <div className="section-detail-about">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <img src={AboutBKC} alt="" />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
