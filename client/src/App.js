import React, { PureComponent, Suspense, lazy } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  showPreviewSelector,
  errorSelector,
  websocketDataSelector
} from './redux/selectors';

import { postOrder, previewOrders } from './redux/actions/previewActions';

import {
  wsConnect,
  wsDisconnect,
  wsHandleSubscribeChange,
  wsPriceSubscribe
} from './redux/actions/websocketActions';

import {
  InputField,
  SelectDropdown,
  CustomRadioButton,
  // OrdersPreviewTable,
  SpinnerComponent
} from './components';

import styles from './css/product.module.css';

const OrdersPreviewTable = lazy(() =>
  import('./components/OrdersPreviewTable')
);

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

  async componentDidMount() {
    await this.props.wsConnect();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.connected !== this.props.connected) {
      this.props.wsPriceSubscribe(this.state.symbol);
    }
  }

  componentWillUnmount() {
    this.props.wsDisconnect();
  }

  handleOnChange = event => {
    const { value, id } = event.target;
    this.props.wsHandleSubscribeChange({
      A: this.state.symbol,
      B: value
    });
    this.setState({
      [id]: value
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
  onPreviewOrders = () => {
    this.props.previewOrders(this.state);
  };

  //testdev123
  render() {
    const emptyStr = '';
    const {
      showPreview,
      error,
      wsCurrentPrice,
      loading,
      loadingreq
    } = this.props;
    const { quantity, n_tp, start, end } = this.state;

    return (
      <>
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
                <CustomRadioButton
                  defaultChecked
                  label="Sell"
                  type="radio"
                  name="side"
                />
                <CustomRadioButton label="Buy" type="radio" name="side" />
              </Col>
              <Col>
                <div variant="link" className={styles.myText}>
                  Current price:
                </div>
              </Col>
              <Col>
                <div className={styles.myTextField}>
                  {wsCurrentPrice || (loading && <SpinnerComponent />)}
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
                  Submit{loadingreq && <SpinnerComponent />}
                </Button>
              </Col>
            </Row>
          </form>
        </Container>

        {showPreview && (
          <Container className={styles.myContainer}>
            <Suspense fallback={<div>Loading...</div>}>
              <OrdersPreviewTable />
            </Suspense>
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  // preview: state.preview
  showPreview: showPreviewSelector(state),
  error: errorSelector(state),
  wsCurrentPrice: websocketDataSelector(state),
  loading: state.websocket.loading,
  loadingreq: state.preview.loading,
  connected: state.websocket.connected
});
export default connect(
  mapStateToProps,
  {
    postOrder,
    previewOrders,
    wsConnect,
    wsDisconnect,
    wsHandleSubscribeChange,
    wsPriceSubscribe
  }
)(App);
