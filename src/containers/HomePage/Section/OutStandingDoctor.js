import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import BDDBS from "../../../assets/outstanding-doctor/103848anh-dai-dien-bs.jpg";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils/constant";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.fetchTopDoctorRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    let allDoctors = this.state.arrDoctors;
    let language = this.props.language;
    console.log("all doctors", allDoctors);
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
              {allDoctors &&
                allDoctors.length > 0 &&
                allDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div class="section-item" key={index}>
                      <a href="#">
                        <img src={imageBase64} alt="" />
                        <h3>{language === languages.VI ? nameVi : nameEn}</h3>
                        <p>Bệnh viện thanh nhàn</p>
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
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
