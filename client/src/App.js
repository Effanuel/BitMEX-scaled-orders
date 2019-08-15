import React, { Component } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";

import {
  previewPrice,
  postOrder,
  previewOrders
} from "./redux/actions/previewActions";

import InputField from "./components/InputField/InputField";
import SelectDropdown from "./components/SelectDropdown/SelectDropdown";
import CustomRadioButton from "./components/CustomRadioButton/CustomRadioButton";
import OrdersPreviewTable from "./components/OrdersPreviewTable/OrderPreviewTable";
import styles from "./css/product.module.css";

class App extends Component {
  state = {
    quantity: 700,
    n_tp: 2,
    start: 12000,
    end: 12500,
    distribution: "Uniform",
    side: "Sell",
    instrument: "XBTUSD",
    instruments: []
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/admin/getInstruments");
      this.setState({ instruments: response.data.instruments });
    } catch (err) {
      console.log(err, "error");
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleOnChangeNumber = event => {
    this.setState({
      [event.target.id]: parseInt(event.target.value)
    });
  };

  onOrderSubmit = event => {
    event.preventDefault();

    this.props.postOrder(this.state);
  };
  onRadioChange = event => {
    console.log(this.state.distribution);
    this.setState({ [event.target.name]: event.target.value });
  };
  onPreviewPrice = event => {
    console.log(typeof this.state.quantity);
    this.props.previewPrice(this.state.instrument);
  };
  onPreviewOrders = () => {
    this.props.previewOrders(this.state);
  };

  //testdev123
  render() {
    const emptyStr = undefined;
    return (
      <div>
        <Container className={styles.myContainer}>
          <form id="orderForm">
            <Row className={styles.myRow}>
              <Col>
                <SelectDropdown
                  instruments={this.state.instruments}
                  id="instrument"
                  onChange={this.handleOnChange}
                  label="Instrument"
                />
              </Col>
              <Col onChange={this.onRadioChange}>
                <CustomRadioButton label="Sell" type="radio" name="side" />
                <CustomRadioButton label="Buy" type="radio" name="side" />
              </Col>
              <Col>
                <Button
                  onClick={this.onPreviewPrice}
                  variant="link"
                  className={styles.myTextButton}
                >
                  Get current price
                </Button>
              </Col>
              <Col>
                <div className={styles.myTextField} id="divtest">
                  {this.props.preview.currentPrice}
                </div>
              </Col>
            </Row>

            <Row className={styles.myRow}>
              <Col>
                <InputField
                  onChange={this.handleOnChangeNumber}
                  value={this.state.quantity || emptyStr}
                  label="Quantity"
                  id="quantity"
                />
              </Col>
              <Col>
                <InputField
                  onChange={this.handleOnChangeNumber}
                  value={this.state.n_tp || emptyStr}
                  label="Order count"
                  id="n_tp"
                />
              </Col>
              <Col>
                <InputField
                  onChange={this.handleOnChangeNumber}
                  value={this.state.start || emptyStr}
                  label="Range start USD"
                  id="start"
                />
              </Col>
              <Col>
                <InputField
                  onChange={this.handleOnChangeNumber}
                  value={this.state.end || emptyStr}
                  label="Range end USD"
                  id="end"
                />
              </Col>
            </Row>

            <Row className={styles.myRow}>
              <Col onChange={this.onRadioChange}>
                <CustomRadioButton
                  defaultChecked
                  label="Uniform"
                  type="radio"
                  name="distribution"
                />
                <CustomRadioButton
                  label="Normal"
                  type="radio"
                  name="distribution"
                />
                <CustomRadioButton
                  label="Positive"
                  type="radio"
                  name="distribution"
                />
                <CustomRadioButton
                  label="Negative"
                  type="radio"
                  name="distribution"
                />
              </Col>
              <Col className={styles.myErrorMessage}>
                {this.state.errorMessage}
              </Col>

              <Col className="">
                <Col className="text-right">
                  <Button
                    onClick={this.onPreviewOrders}
                    variant="link"
                    className={styles.myTextButton}
                  >
                    Preview
                  </Button>
                </Col>
              </Col>

              <Col>
                <Button
                  onClick={this.onOrderSubmit}
                  className={styles.myButton}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
        {this.props.preview.showPreview && (
          <Container className={styles.myContainer}>
            <OrdersPreviewTable />
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ preview }) => ({
  // preview: state.preview
  preview
});
export default connect(
  mapStateToProps,
  { previewPrice, postOrder, previewOrders }
)(App);
