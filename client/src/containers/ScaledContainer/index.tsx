import React, { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  messageSelector,
  orderLoadingSelector,
  orderErrorSelector,
  // websocketOrder,
  websocketLoadingSelector,
} from "redux/selectors";

import {
  previewOrders,
  previewClose,
  getBalance,
  scaledOrders,
} from "redux/modules/preview";

import {
  wsConnect,
  wsDisconnect,
  wsTickerChange,
} from "redux/modules/websocket";
// COMPONENTS
import {
  InputField,
  SelectDropdown,
  CustomRadioButton,
  // OrdersPreviewTable,
  MainContainer,
  SVGIcon,
  Button,
} from "components";

import { Grid, RadioGroup } from "@material-ui/core";
import ICONS from "components/SVGIcon/icons";

// UTILS
import { AppState } from "redux/models/state";
// STYLES
import styles from "./styles.module.css";

interface State {
  quantity: any;
  n_tp: any;
  start: any;
  end: any;
  stop: any;
  distribution: any;
  side: any;
  symbol: any;
  [key: string]: number | string;
}

interface Props {
  wsCurrentPrice: any;
}

const initialState: Readonly<State> = {
  quantity: "",
  n_tp: "",
  start: "",
  end: "",
  stop: "",
  distribution: "Uniform",
  side: "Sell",
  symbol: "XBTUSD",
};

const ScaledContainer = React.memo(({ wsCurrentPrice }: Props) => {
  const dispatch = useDispatch();
  const { loading, orderLoading, message, orderError } = useSelector(
    (state: AppState) => ({
      loading: websocketLoadingSelector(state),
      orderLoading: orderLoadingSelector(state),
      message: messageSelector(state),
      orderError: orderErrorSelector(state),
    }),
    shallowEqual
  );

  const [state, setState] = useState(initialState);
  const [cache, setCache] = useState(true);

  // useEffect(() => {
  //   // Subscribe to Websocket
  //   dispatch(wsConnect());
  //   // Fetch balance so we can calculate risk later
  //   dispatch(getBalance());
  //   return () => {
  //     // Unsubscribe from Websocket
  //     dispatch(wsDisconnect());
  //   };
  // }, [dispatch]);

  //======================================================
  //
  // not so elequent way to handle preview button press handling
  function handleCache() {
    // setCache(prevState => ({ ...prevState, cache: false }));
    setCache(false);
  }

  function onChangeDropdown(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, id } = event.target;
    dispatch(wsTickerChange(value));
    setState((prevState) => ({
      ...prevState,
      [id]: value,
      start: "",
      end: "",
      stop: "",
    }));
    //
    //
    handleCache();
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value, tagName } = event.target;
    const updated = tagName == "INPUT" ? +value : value;
    setState((prevState) => ({ ...prevState, [id]: updated }));
    //
    //
    handleCache();
  }

  function onOrderSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    dispatch(scaledOrders(state));
    //
    // instead of this, input fields could be cleared
    handleCache();
  }

  function onPreviewOrders(): void {
    if (cache) {
      dispatch(previewClose());
    } else {
      setCache(true);
      dispatch(previewOrders(state));
    }
  }

  return (
    <MainContainer label="ScaledOrders">
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={3} className={styles.container__col}>
          <SelectDropdown
            instruments={["XBTUSD", "ETHUSD", "XRPUSD"]}
            id="symbol"
            onChange={onChangeDropdown}
            label="Instrument"
          />
        </Grid>
        <Grid item xs={3}>
          <RadioGroup
            aria-label="position"
            name="side"
            value={state.side}
            onChange={onChange}
          >
            <CustomRadioButton
              id="scaled_side_sell"
              label="Sell"
              value="Sell"
            />
            <CustomRadioButton id="scaled_side_buy" label="Buy" value="Buy" />
          </RadioGroup>
        </Grid>
        <Grid item xs={3}>
          <div className={styles.text_field}>
            {loading ? "Loading..." : wsCurrentPrice}

            {/* {wsCurrentPrice || (loading && <SpinnerComponent />)} */}
          </div>
          <div className={styles.message}>{message}</div>
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChange}
            value={state.stop}
            label="Stop-Loss"
            id="stop"
            stop={true}
            t_placement="bottom"
            tooltip="Price at which to market exit all contracts."
          />
        </Grid>

        <Grid item xs={3}>
          <InputField
            onChange={onChange}
            value={state.quantity}
            label="Quantity"
            id="quantity"
            tooltip="Number of contracts"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChange}
            value={state.n_tp}
            label="Order count"
            id="n_tp"
            tooltip="Number of individual orders"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChange}
            value={state.start}
            label="Range start"
            id="start"
            tooltip="First placed order's price"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={onChange}
            value={state.end}
            label="Range end"
            id="end"
            tooltip="Last placed order's price"
          />
        </Grid>

        <Grid item xs={4}>
          <RadioGroup
            aria-label="Distribution"
            name="distribution"
            value={state.distribution}
            onChange={onChange}
            row
          >
            <CustomRadioButton
              id="scaled_distr_uniform"
              label={
                <>
                  Uniform
                  <SVGIcon color="white" icon={ICONS.UNIFORM} />
                </>
              }
              value="Uniform"
            />
            <CustomRadioButton
              id="scaled_distr_normal"
              label={
                <>
                  Normal
                  <SVGIcon color="white" icon={ICONS.NORMAL} />
                </>
              }
              value="Normal"
            />
            <CustomRadioButton
              id="scaled_distr_positive"
              label={
                <>
                  Positive
                  <SVGIcon color="white" icon={ICONS.POSITIVE} />
                </>
              }
              value="Positive"
            />
            <CustomRadioButton
              id="scaled_distr_negative"
              label={
                <>
                  Negative
                  <SVGIcon color="white" icon={ICONS.NEGATIVE} />
                </>
              }
              value="Negative"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={3} className={styles.myErrorMessage}>
          {orderError}
        </Grid>

        <Grid item xs={2} className="text-right">
          <Button
            onClick={onPreviewOrders}
            variant="text"
            disabled={
              !(
                state.quantity &&
                state.n_tp &&
                state.n_tp > 1 &&
                state.start &&
                state.end
              ) ||
              state.n_tp > 50 ||
              state.quantity < state.n_tp ||
              (state.stop && state.side === "Buy"
                ? state.stop > state.start && state.stop > state.end
                : false) ||
              (state.stop && state.side === "Sell"
                ? state.stop < state.start && state.stop < state.end
                : false) ||
              state.quantity > 20e6
            }
          >
            Preview
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            onClick={onOrderSubmit}
            disabled={
              !(
                state.quantity &&
                state.n_tp &&
                state.n_tp > 1 &&
                state.start &&
                state.end
              ) ||
              state.n_tp > 50 ||
              state.quantity < state.n_tp ||
              (state.stop && state.side === "Buy"
                ? state.stop > state.start && state.stop > state.end
                : false) ||
              (state.stop && state.side === "Sell"
                ? state.stop < state.start && state.stop < state.end
                : false) ||
              state.quantity > 20e6
            }
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </MainContainer>
  );
});
export default ScaledContainer;
