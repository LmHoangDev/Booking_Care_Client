import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import BackGroundKCK from "../../assets/images/133537-khamchuyenkhoa.png";
import BackGroundKTX from "../../assets/images/133657-khamtuxa.png";
import BackGroundDVXN from "../../assets/images/133744-dichvuxetnghiem.png";
import BackGroundKTQ from "../../assets/images/133744-khamtongquat.png";
import BackGroundSKTT from "../../assets/images/133744-suckhoetinhthan.png";
import BackGroundGPT from "../../assets/images/134356-goi-phau-thuat.png";
import BackGroundKTN from "../../assets/images/133744-khamtainha.png";
import { languages } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleGoBackHome = () => {
    this.props.history.push("/home");
  };
  render() {
    let language = this.props.language;
    return (
      <>
        <header className="header-home-page">
          <div className="container">
            <div className="row">
              <div
                className="col-3 header-left"
                onClick={() => this.handleGoBackHome()}
              >
                <a href="#">
                  <i className="fa fa-bars"></i>
                </a>
              </div>
              <div className="col-7 header-center">
                <div className="header-center-item">
                  <a href="#">
                    <b>
                      <FormattedMessage id="homeheader.speciality" />
                    </b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    <FormattedMessage id="homeheader.searchdoctor" />
                  </a>
                </div>
                <div className="header-center-item">
                  <a href="#">
                    <b>
                      <FormattedMessage id="homeheader.heath-facility" />
                    </b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    <FormattedMessage id="homeheader.select-room" />
                  </a>
                </div>
                <div className="header-center-item">
                  <a href="#">
                    <b>
                      {" "}
                      <FormattedMessage id="homeheader.doctor" />
                    </b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    <FormattedMessage id="homeheader.seclect-doctor" />
                  </a>
                </div>
                <div className="header-center-item">
                  <a href="#">
                    <b>
                      {" "}
                      <FormattedMessage id="homeheader.fee" />
                    </b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    <FormattedMessage id="homeheader.check-health" />
                  </a>
                </div>
              </div>
              <div className="col-2 header-right text-left">
                <div>
                  {" "}
                  <a href="#" className="detail">
                    <i className="fa fa-question-circle"></i>{" "}
                    <span style={{ color: "#969495" }}>
                      {" "}
                      <FormattedMessage id="homeheader.support" />
                    </span>
                  </a>
                </div>
                <div className="language">
                  <div
                    className={
                      language === "vi" ? "language-vi active" : "language-vi"
                    }
                  >
                    <span onClick={() => this.changeLanguage(languages.VI)}>
                      VN
                    </span>
                  </div>
                  <div
                    className={
                      language === "en" ? "language-en active" : "language-en"
                    }
                  >
                    <span onClick={() => this.changeLanguage(languages.EN)}>
                      EN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {this.props.isShowBanner && (
          <section className="header-home-banner">
            <h1 className="banner-title text-center text-light py-5">
              {" "}
              <FormattedMessage id="banner.title1" /> <br />{" "}
              <b>
                {" "}
                <FormattedMessage id="banner.title2" />
              </b>
            </h1>
            <div className="banner-search text-center">
              <i className="fa fa-search"></i>
              <input type="text" placeholder="Search" />
            </div>
            <div className="banner-options">
              <ul className="mt-5 container">
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundKCK})`,
                    }}
                  ></div>

                  <a href="#">
                    <FormattedMessage id="banner.child1" />
                  </a>
                </li>
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundKTX})`,
                    }}
                  ></div>
                  <a href="#">
                    <FormattedMessage id="banner.child2" />
                  </a>
                </li>
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundKTQ})`,
                    }}
                  ></div>
                  <a href="#">
                    <FormattedMessage id="banner.child3" />
                  </a>
                </li>
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundDVXN})`,
                    }}
                  ></div>
                  <a href="#">
                    <FormattedMessage id="banner.child4" />
                  </a>
                </li>
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundSKTT})`,
                    }}
                  ></div>
                  <a href="#">
                    <FormattedMessage id="banner.child5" />
                  </a>
                </li>
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundKCK})`,
                    }}
                  ></div>
                  <a href="#">
                    <FormattedMessage id="banner.child6" />
                  </a>
                </li>
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundGPT})`,
                    }}
                  ></div>
                  <a href="#">
                    <FormattedMessage id="banner.child7" />
                  </a>
                </li>
                <li>
                  <div
                    style={{
                      backgroundImage: `url(${BackGroundKTN})`,
                    }}
                  ></div>
                  <a href="#">
                    <FormattedMessage id="banner.child8" />
                  </a>
                </li>
              </ul>
            </div>
          </section>
        )}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
