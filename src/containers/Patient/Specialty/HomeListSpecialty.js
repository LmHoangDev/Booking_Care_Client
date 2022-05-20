import { HomeOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getListSpecialtyService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import HomeFooter from "../../HomePage/HomeFooter";

class HomeListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialties: [],

      //   listDoctorsId: [],
    };
  }
  handleViewDetailSpecialty = (item) => {
    // console.log("View detail", item);
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  async componentDidMount() {
    try {
      let res = await getListSpecialtyService();
      console.log("res specialty", res);
      if (res && res.errCode === 0) {
        this.setState({
          listSpecialties: res.data ? res.data : [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let { listSpecialties } = this.state;
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
                Chuyên khoa
              </span>
            </div>
            {listSpecialties &&
              listSpecialties.length > 0 &&
              listSpecialties.map((item, index) => {
                return (
                  <div
                    className="col-12 mt-4 mb-3"
                    key={index}
                    style={{ cursor: "pointer", display: "flex" }}
                    onClick={() => this.handleViewDetailSpecialty(item)}
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
  connect(mapStateToProps, mapDispatchToProps)(HomeListSpecialty)
);
