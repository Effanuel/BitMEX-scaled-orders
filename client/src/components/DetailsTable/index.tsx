import React from "react";
// REDUX
import { useSelector, shallowEqual } from "react-redux";
import {
  ordersSelector,
  ordersAveragePriceSelector,
  ordersRiskSelector
} from "../../redux/selectors";
// UTILS
import styles from "./styles.module.css";

interface IDetailsTableProps {}

export const DetailsTable: React.FunctionComponent<IDetailsTableProps> = props => {
  const { averagePrice, riskBTC } = useSelector(
    (state: any) => ({
      orders: ordersSelector(state),
      averagePrice: ordersAveragePriceSelector(state),
      riskBTC: ordersRiskSelector(state)
    }),
    shallowEqual
  );
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Details</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Average price:</td>
          <td>
            {`${averagePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            <span className={styles.color_accent}> USD</span>
          </td>
        </tr>
        {riskBTC ? (
          <tr>
            <td>Risk:</td>
            <td>
              {riskBTC}
              <span className={styles.color_accent}> BTC</span>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};
