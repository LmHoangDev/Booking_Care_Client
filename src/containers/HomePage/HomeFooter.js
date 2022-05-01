import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import LogoFooter from "../../assets/images/bookingcare-2020.svg";
import LogoSub from "../../assets/images/sub.svg";
import LogoFacebook from "../../assets/images/facebook-square.svg";
import LogoYoutube from "../../assets/images/youtube-square.svg";
import { changeLanguageApp } from "../../store/actions";
import "./HomeFooter.scss";
class HomeFooter extends Component {
  render() {
    return (
      <>
        <footer className="home-footer">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img src={LogoFooter} alt="..." className="logo-footer" />
                <p className="title-footer">
                  Công ty Cổ phần Công nghệ BookingCare
                </p>
                <ul>
                  <li>
                    <p>
                      <i className="fas fa-map-marker-alt"></i> Trụ sở tại Hà
                      Nội: 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-check"></i>ĐKKD số: 0106790291. Sở
                      KHĐT Hà Nội cấp ngày 16/03/2015
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <p className="support">
                  <span className="font-weight-bold">Hỗ trợ khách hàng</span>
                  <br /> support@bookingcare.vn (7h30 - 18h)
                </p>
                <ul className="list-social">
                  <li>
                    <a
                      href="https://www.facebook.com/bookingcare"
                      target="_blank"
                    >
                      <img src={LogoFacebook} alt="..." />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ"
                      target="_blank"
                    >
                      <img src={LogoYoutube} alt="..." />
                    </a>
                  </li>
                </ul>{" "}
                <img src={LogoSub} alt="..." className="logo-sub" />
              </div>
            </div>
          </div>
          <p className="copy-right">© 2022 BookingCare.</p>
        </footer>
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
