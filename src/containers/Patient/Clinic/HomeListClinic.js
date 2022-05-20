import { HomeOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import HomeFooter from "../../HomePage/HomeFooter";
// import "./HomeListClinic.scss";
import "./DetailClinic.scss";
class HomeListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],

      //   listDoctorsId: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllClinicsStart();
    if (this.props.clinics) {
      this.setState({
        listClinic: this.props.clinics,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.clinics !== this.props.clinics) {
      this.setState({
        listClinic: this.props.clinics,
      });
    }
  }

  render() {
    let { listClinic } = this.state;
    return (
      <>
        <div className="container-list-home container">
          <div className="row">
            {" "}
            <div
              className="col-12 title text-left"
              onClick={() => this.props.history.push("/home")}
              style={{ cursor: "pointer" }}
            >
              <span>
                <HomeOutlined />
                Bệnh viện, phòng khám
              </span>
            </div>
            <div className="col-12 mt-4">
              <h5>Bệnh viện, phòng khám nổi bật</h5>
            </div>
            {listClinic &&
              listClinic.length > 0 &&
              listClinic.map((item, index) => {
                return (
                  <div
                    className="col-12 mt-4 mb-3"
                    key={index}
                    style={{ cursor: "pointer", display: "flex" }}
                    onClick={() =>
                      this.props.history.push(`/detail-clinic/${item.id}`)
                    }
                  >
                    <div className="col-3">
                      <img
                        src={item.image}
                        alt=""
                        style={{ maxWidth: "200px", height: "150px" }}
                      />
                    </div>
                    <div className="col-9">
                      <p
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                        className="mt-3"
                      >
                        {item.name}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>{" "}
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, clinics: state.admin.clinics };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClinicsStart: () => dispatch(actions.fetchAllClinicsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeListClinic)
);
