import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getListClinicService } from "../../../services/userService";
import { withRouter } from "react-router";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }
  async componentDidMount() {
    try {
      let res = await getListClinicService();
      if (res && res.errCode === 0) {
        this.setState({
          listClinic: res.data ? res.data : [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { listClinic } = this.state;
    return (
      <>
        <div className="section-container medical-facility">
          <div className="container py-4">
            <div className="section-title d-flex">
              <h1>
                <FormattedMessage id="homepage.outstanding-medical-facility" />
              </h1>
              <div className="see-more">
                <a href="#">
                  {" "}
                  <FormattedMessage id="homepage.search" />
                </a>
              </div>
            </div>
            <Slider {...settings}>
              {listClinic &&
                listClinic.length > 0 &&
                listClinic.map((item, index) => {
                  return (
                    <div
                      className="section-item"
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <a href="#" className="d-block">
                        <img src={item.image} alt="" />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
