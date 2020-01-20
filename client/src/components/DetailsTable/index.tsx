import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import {
  ordersSelector,
  ordersAveragePriceSelector,
  ordersRiskSelector
} from "../../redux/selectors";

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
    <table className={styles.preview}>
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
            {`${averagePrice}`}
            <span className={styles.customStyle}> USD</span>
          </td>
        </tr>
        {riskBTC ? (
          <tr>
            <td>Risk:</td>
            <td>
              {riskBTC}
              <span className={styles.customStyle}> BTC</span>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};
