import React, { useEffect, useState } from "react";
// REDUX
import { marketOrder } from "redux/modules/preview";
import { wsSubscribeTo, wsUnsubscribeFrom } from "redux/modules/websocket";
import { post_bestOrder, __clearBestOrder } from "redux/modules/best_price";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { bestOrderStatus, bestOrderStatusSelector } from "redux/selectors";
// COMPONENTS
import { MainContainer, SelectDropdown, InputField, Button } from "components";
import Grid from "@material-ui/core/Grid";
// STYLES
import styles from "./styles.module.css";

export interface Props {}

interface State {
  symbol: string;
  quantity: any;
}

const initialState: Readonly<State> = {
  symbol: "XBTUSD",
  quantity: 50,
};

function MarketOrderContainer({ wsCurrentPrice }: any) {
  const [state, setState] = useState(initialState);
  // REDUX
  const dispatch = useDispatch();
  const { status, best_order_status } = useSelector(
    (state: any) => ({
      status: bestOrderStatus(state),
      best_order_status: bestOrderStatusSelector(state),
      // check current open orders

      // check if connected to websocket
    }),
    shallowEqual
  );
  // ===

  // useEffect(() => {
  //cancel order if crashed
  //   dispatch(getOrders());
  // }, [dispatch]);

  useEffect(() => {
    //Check the status of our best_order
    const statuses = ["Filled", "Canceled", "Order not placed."];
    if (
      statuses.includes(best_order_status) &&
      status !== "Order not placed."
    ) {
      // Set a timeout so we can still see a "Canceled" message.
      setTimeout(async () => {
        // Clear state if order is filled/canceled, since we have a separate reducer for that
        dispatch(__clearBestOrder());
        dispatch(wsUnsubscribeFrom("order"));
        //unsubscribe from websocket order
      }, 3000);
    }
  }, [dispatch, best_order_status]);

  useEffect(() => {
    // As soon as the order is placed on the order books,
    // subscribe to /order/
    if (status === "Order placed.") {
      console.log("call sub to order");
      dispatch(wsSubscribeTo("order"));
    }
  }, [dispatch, status]);

  function submitBestOrder(event: any) {
    // dispatch(marketOrder({ ...state, side: event.target.id }));
    // ({ symbol, price, quantity, side, ordType, text_index=0 }: any)
    const { id: side } = event.target;
    dispatch(
      post_bestOrder({
        ...state,
        price: wsCurrentPrice,
        side,
        ordType: "Limit",
        text_prefix: "best_order",
      })
    );
  }

  function submitMarketOrder(event: any) {
    const { id } = event.target;
    dispatch(marketOrder({ ...state, side: id }));
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value, tagName } = event.target;
    const updated = tagName === "INPUT" ? +value : value;
    // Handles uncontrolled number input to be controlled if its empty
    setState((prevState) => ({ ...prevState, [id]: updated }));
  }

  return (
    <MainContainer label="MarkerOrder">
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={3}>
          <SelectDropdown id="symbol" onChange={onChange} label="Instrument" />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChange}
            value={state.quantity}
            label="Quantity"
            id="quantity"
          />
        </Grid>
        <Grid item xs={3} className={styles.top_row}>
          <Button
            id="Buy"
            variant="custom"
            className={styles.button_buy}
            onClick={submitMarketOrder}
            disabled={!state.quantity || state.quantity > 20e6}
          >
            MARKET Buy
          </Button>
        </Grid>
        <Grid item xs={3} className={styles.top_row}>
          <Button
            id="Sell"
            variant="custom"
            className={styles.button_sell}
            onClick={submitMarketOrder}
            disabled={!state.quantity || state.quantity > 20e6}
          >
            MARKET Sell
          </Button>
        </Grid>
        <Grid item xs={6}>
          <div style={{ color: "white" }}>
            Best order status:{" "}
            <span style={{ color: "green" }}>{best_order_status}</span>
          </div>
          {/* <div style={{ color: "green" }}>{status}</div> */}
        </Grid>
        <Grid item xs={3}>
          <Button
            id="Buy"
            variant="custom"
            className={styles.button_buy}
            onClick={submitBestOrder}
            disabled={
              !state.quantity ||
              state.quantity > 20e6 ||
              best_order_status === "New" ||
              !wsCurrentPrice
            }
          >
            BEST Buy
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            id="Sell"
            variant="custom"
            className={styles.button_sell}
            onClick={submitBestOrder}
            disabled={
              !state.quantity ||
              state.quantity > 20e6 ||
              best_order_status === "New" ||
              !wsCurrentPrice
            }
          >
            BEST Sell
          </Button>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
export { MarketOrderContainer };
