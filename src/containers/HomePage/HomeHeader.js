import { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
class HomeHeader extends Component {
  render() {
    return (
      <>
        <header className="header-home-page">
          <div className="container">
            <div className="row">
              <div className="col-3 header-left">
                <a href="#">
                  <i className="fa fa-bars"></i>
                </a>
              </div>
              <div className="col-7 header-center">
                <div className="header-center-item">
                  <a href="#">
                    <b>Chuyên khoa</b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    Tìm bác sĩ theo chuyên khoa
                  </a>
                </div>
                <div className="header-center-item">
                  <a href="#">
                    <b>Cơ sở y tế</b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    Chọn bệnh viện phòng khám
                  </a>
                </div>
                <div className="header-center-item">
                  <a href="#">
                    <b>Bác sĩ</b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    Chọn bác sĩ giỏi
                  </a>
                </div>
                <div className="header-center-item">
                  <a href="#">
                    <b>Gói khám</b>
                  </a>
                  <br />
                  <a href="#" className="detail">
                    Khám sức khỏe tổng quát
                  </a>
                </div>
              </div>
              <div className="col-2 header-right text-left">
                <a href="#" className="detail">
                  <i className="fa fa-question-circle"></i>{" "}
                  <span style={{ color: "#969495" }}>Hỗ trợ</span>
                </a>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
