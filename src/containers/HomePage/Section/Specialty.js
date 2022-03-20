import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ImgYHCT from "../../../assets/specialty/y-hoc-co-truyen.jpg";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getListSpecialtyService } from "../../../services/userService";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }
  async componentDidMount() {
    try {
      let res = await getListSpecialtyService();
      console.log("res specialty", res);
      if (res && res.errCode === 0) {
        this.setState({
          listSpecialty: res.data ? res.data : [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    let { listSpecialty } = this.state;

    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="section-container">
          <div className="container py-4">
            <div className="section-title d-flex">
              <h1>
                <FormattedMessage id="homepage.popular-specialty" />
              </h1>
              <div className="see-more">
                <a href="#">
                  {" "}
                  <FormattedMessage id="homepage.more-info" />
                </a>
              </div>
            </div>
            <Slider {...settings}>
              {listSpecialty &&
                listSpecialty.length > 0 &&
                listSpecialty.map((item, index) => {
                  return (
                    <div className="section-item" key={index}>
                      <a href="#" className="d-block">
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
