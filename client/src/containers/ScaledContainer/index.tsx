import React, { useEffect, useState } from "react";
// REDUX
import {
  messageSelector,
  orderLoadingSelector,
  orderErrorSelector,
  websocketCurrentPrice,
  websocketOrder,
  websocketLoadingSelector
} from "../../redux/selectors";

import {
  postOrder,
  previewOrders,
  previewClose
} from "../../redux/modules/preview/preview";

import {
  wsConnect,
  wsDisconnect,
  wsTickerChange
} from "../../redux/modules/websocket/websocket";
// COMPONENTS
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  InputField,
  SelectDropdown,
  CustomRadioButton,
  // OrdersPreviewTable,
  SpinnerComponent
} from "../../components";

// UTILS
import { AppState } from "../../redux/models/state";
import { AppComponentState } from "../../@types"; //AppComponentProps,
import styles from "./styles.module.css";

const initialState = Object.freeze({
  quantity: "",
  n_tp: "",
  start: "",
  end: "",
  stop: "",
  distribution: "Uniform",
  side: "Sell",
  symbol: "XBTUSD"
});

export default function ScaledContainer() {
  const dispatch = useDispatch();
  const {
    wsCurrentPrice,
    loading,
    orderLoading,
    ordersFilled,
    message,
    orderError
  } = useSelector(
    (state: AppState) => ({
      wsCurrentPrice: websocketCurrentPrice(state),
      loading: websocketLoadingSelector(state),
      orderLoading: orderLoadingSelector(state),
      message: messageSelector(state),
      ordersFilled: websocketOrder(state),
      orderError: orderErrorSelector(state)
    }),
    shallowEqual
  );

  const [state, setState] = useState<AppComponentState>(initialState);
  const [cache, setCache] = useState({ cache: true });

  useEffect((): any => {
    dispatch(wsConnect());
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);
  //
  //======================================================
  //
  // not so elequent way to handle preview button press handling
  function handleCache() {
    setCache(prevState => ({ ...prevState, cache: false }));
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, id } = event.target;
    dispatch(wsTickerChange(value));
    setState(prevState => ({ ...prevState, [id]: value }));
    //
    //
    handleCache();
  }

  function handleOnChangeNumber(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { id, value } = event.target;
    setState(prevState => ({ ...prevState, [id]: parseFloat(value) }));
    //
    //
    handleCache();
  }

  function onOrderSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    dispatch(postOrder(state));
    //
    // instead of this, input fields could be cleared
    handleCache();
  }

  function onRadioChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    //
    //
    handleCache();
  }

  function onPreviewOrders(): void {
    if (cache.cache === true) {
      dispatch(previewClose());
    } else {
      setCache(prevState => ({ ...prevState, cache: true }));
      dispatch(previewOrders(state));
    }
  }

  return (
    <>
      <Container className={styles.container_scaled}>
        <form id="orderForm">
          <Row className={styles.container__row}>
            <Col>
              <SelectDropdown
                instruments={["XBTUSD", "ETHUSD"]}
                id="symbol"
                onChange={handleOnChange}
                label="Instrument"
              />
            </Col>
            <Col onChange={onRadioChange} className={styles.radio__side}>
              <CustomRadioButton
                defaultChecked
                label="Sell"
                type="radio"
                name="side"
              />
              <CustomRadioButton label="Buy" type="radio" name="side" />
            </Col>
            <Col>
              <div className={styles.text_field}>
                {loading ? "Loading..." : wsCurrentPrice}

                {/* {wsCurrentPrice || (loading && <SpinnerComponent />)} */}
              </div>
              <div className={styles.message}>{message}</div>
            </Col>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.stop}
                label="Stop-Loss"
                id="stop"
                stop={true}
              />
            </Col>
          </Row>

          <Row className={styles.container__row}>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.quantity}
                label="Quantity"
                id="quantity"
              />
            </Col>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.n_tp}
                label="Order count"
                id="n_tp"
              />
            </Col>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.start}
                label="Range start USD"
                id="start"
              />
            </Col>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.end}
                label="Range end USD"
                id="end"
              />
            </Col>
          </Row>

          <Row className={styles.container__row}>
            <Col onChange={onRadioChange}>
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
            <Col className={styles.myErrorMessage}>{orderError}</Col>

            <Col className="">
              <Col className="text-right">
                <Button
                  onClick={onPreviewOrders}
                  variant="link"
                  className={styles.text_button}
                  disabled={
                    !(
                      state.quantity &&
                      state.n_tp &&
                      state.n_tp > 1 &&
                      state.start &&
                      state.end
                    ) ||
                    state.quantity < state.n_tp ||
                    (state.stop && state.side === "Buy"
                      ? state.stop > state.start && state.stop > state.end
                      : false) ||
                    (state.stop && state.side === "Sell"
                      ? state.stop < state.start && state.stop < state.end
                      : false)
                  }
                >
                  Preview
                </Button>
              </Col>
            </Col>

            <Col>
              <Button
                onClick={onOrderSubmit}
                className={styles.button}
                disabled={
                  !(
                    state.quantity &&
                    state.n_tp &&
                    state.n_tp > 1 &&
                    state.start &&
                    state.end
                  ) ||
                  state.quantity < state.n_tp ||
                  (state.stop && state.side === "Buy"
                    ? state.stop > state.start && state.stop > state.end
                    : false) ||
                  (state.stop && state.side === "Sell"
                    ? state.stop < state.start && state.stop < state.end
                    : false)
                }
              >
                Submit{orderLoading && <SpinnerComponent />}
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
      <div style={{ color: "white" }}>{ordersFilled}</div>
    </>
  );
}
