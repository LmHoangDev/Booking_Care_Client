import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import "./DoctorExtraInfor.scss";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
      extraInfo: {},
    };
  }
  handleShowDetails = (status) => {
    this.setState({ isShowDetail: status });
  };
  async componentDidMount() {
    if (this.props.doctorIdFromParent !== -1) {
      this.props.fetchExtraDoctorInforRedux(this.props.doctorIdFromParent);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setState({ extraInfo: this.props.allExtraInforDoctorRedux });
    }
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      this.props.fetchExtraDoctorInforRedux(this.props.doctorIdFromParent);
    }
    if (
      prevProps.allExtraInforDoctorRedux !== this.props.allExtraInforDoctorRedux
    ) {
      this.setState({ extraInfo: this.props.allExtraInforDoctorRedux });
    }
  }
  render() {
    let { isShowDetail, extraInfo } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="col-12 address">
          <h3>
            <FormattedMessage id="patient.extra-infor.address" />
          </h3>
          <p className="specialty">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </p>
          <p>
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </p>
        </div>
        <div className="col-12 price">
          <p>
            <span className="text-uppercase">
              <FormattedMessage id="patient.extra-infor.price" />:
            </span>
            {isShowDetail ? (
              ""
            ) : (
              <>
                <span className="mx-1">
                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === languages.VI && (
                      <NumberFormat
                        value={extraInfo.priceTypeData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"đ"}
                      />
                    )}
                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === languages.EN && (
                      <NumberFormat
                        value={extraInfo.priceTypeData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                </span>{" "}
                <span
                  className="show-detail"
                  onClick={() => this.handleShowDetails(true)}
                >
                  <FormattedMessage id="patient.extra-infor.see" />
                </span>
              </>
            )}
          </p>
          {isShowDetail ? (
            <div className="price-detail">
              <div className="price-top">
                <p className="d-flex justify-content-between">
                  <FormattedMessage id="patient.extra-infor.price" />:{" "}
                  <span className="text-right">
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === languages.VI && (
                        <NumberFormat
                          value={extraInfo.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                        />
                      )}
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === languages.EN && (
                        <NumberFormat
                          value={extraInfo.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                </p>
                <p className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </p>
              </div>

              <p className="payment-container">
                <FormattedMessage id="patient.extra-infor.payment" />
                <span className="payment text-danger">
                  {extraInfo &&
                    extraInfo.paymentTypeData &&
                    language === languages.VI &&
                    extraInfo.paymentTypeData.valueVi}
                  {extraInfo &&
                    extraInfo.paymentTypeData &&
                    language === languages.EN &&
                    extraInfo.paymentTypeData.valueEn}
                </span>
              </p>
              <span
                className="hidden-price"
                onClick={() => this.handleShowDetails(false)}
              >
                <FormattedMessage id="patient.extra-infor.hide-price" />
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allExtraInforDoctorRedux: state.admin.allExtraInforDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExtraDoctorInforRedux: (id) =>
      dispatch(actions.fetchExtraDoctorInforStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
