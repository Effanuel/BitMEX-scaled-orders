import React from "react";
// REDUX
import { useSelector, shallowEqual } from "react-redux";
import {
  ordersSelector,
  ordersAveragePriceSelector,
  ordersRiskSelector,
  balanceSelector,
  ordersRiskPercSelector
} from "../../redux/selectors";
// UTILS
import styles from "./styles.module.css";

interface IDetailsTableProps {}

export const DetailsTable: React.FunctionComponent<IDetailsTableProps> = props => {
  const { averagePrice, riskBTC, riskPerc } = useSelector(
    (state: any) => ({
      orders: ordersSelector(state),
      averagePrice: ordersAveragePriceSelector(state),
      riskBTC: ordersRiskSelector(state),
      riskPerc: ordersRiskPercSelector(state)
    }),
    shallowEqual
  );
 function format(num:any) {
    return num.toString().replace(/^[+-]?\d+/, function(int:any) {
      return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
}

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
            {format(averagePrice)}
            <span className={styles.color_accent}> USD</span>
          </td>
        </tr>
        {riskBTC ? (
          <>
            <tr>
              <td>Risk:</td>
              <td>
                {riskBTC}
                <span className={styles.color_accent}> BTC</span>
              </td>
            </tr>
            {!isNaN(riskPerc) && (
              <tr>
                <td>Risk(%):</td>
                <td>
                  {riskPerc}
                  <span className={styles.color_accent}> %</span>
                  {/* <span className={styles.color_accent}> BTC</span> */}
                </td>
              </tr>
            )}
          </>
        ) : null}
      </tbody>
    </table>
  );
};
