import React, { PureComponent } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  showPreviewSelector,
  currentPriceSelector,
  errorSelector
} from './redux/selectors';

import {
  previewPrice,
  postOrder,
  previewOrders
} from './redux/actions/previewActions';

import InputField from './components/InputField/InputField';
import SelectDropdown from './components/SelectDropdown/SelectDropdown';
import CustomRadioButton from './components/CustomRadioButton/CustomRadioButton';
import OrdersPreviewTable from './components/OrdersPreviewTable/OrdersPreviewTable';
import styles from './css/product.module.css';

class App extends PureComponent {
  state = {
    quantity: 700,
    n_tp: 2,
    start: 12000,
    end: 12500,
    distribution: 'Uniform',
    side: 'Sell',
    symbol: 'XBTUSD'
  };

  // async componentDidMount() {
  //   try {
  //     const response = await axios.get('/bitmex/getInstruments');
  //     this.setState({ instruments: response.data.instruments });
  //   } catch (err) {
  //     console.log(err, 'error');
  //   }
  // }

  handleOnChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleOnChangeNumber = event => {
    this.setState({
      [event.target.id]: { ...this.state[event.target.id] },
      [event.target.id]: parseInt(event.target.value)
    });
  };

  onOrderSubmit = event => {
    event.preventDefault();

    this.props.postOrder(this.state);
  };
  onRadioChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onPreviewPrice = () => {
    this.props.previewPrice(this.state.symbol);
  };
  onPreviewOrders = () => {
    this.props.previewOrders(this.state);
  };

  //testdev123
  render() {
    const emptyStr = '';
    const { showPreview, currentPrice, error } = this.props;
    const { quantity, n_tp, start, end } = this.state;

    return (
      <div>
        <Container className={styles.myContainer}>
          <form id="orderForm">
            <Row className={styles.myRow}>
              <Col>
                <SelectDropdown
                  instruments={['XBTUSD', 'ETHUSD']}
                  id="symbol"
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
                  {currentPrice}
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
              <Col className={styles.myErrorMessage}>{error}</Col>

              <Col className="">
                <Col className="text-right">
                  <Button
                    onClick={this.onPreviewOrders}
                    variant="link"
                    className={styles.myTextButton}
                    disabled={
                      !(quantity && n_tp && start && end) || quantity < n_tp
                    }
                  >
                    Preview
                  </Button>
                </Col>
              </Col>

              <Col>
                <Button
                  onClick={this.onOrderSubmit}
                  className={styles.myButton}
                  disabled={
                    !(quantity && n_tp && start && end) || quantity < n_tp
                  }
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Container>

        {showPreview && (
          <Container className={styles.myContainer}>
            <OrdersPreviewTable />
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // preview: state.preview
  showPreview: showPreviewSelector(state),
  currentPrice: currentPriceSelector(state),
  error: errorSelector(state)
});
export default connect(
  mapStateToProps,
  { previewPrice, postOrder, previewOrders }
)(App);
