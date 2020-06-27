import React from 'react';
// REDUX
import { useSelector, shallowEqual } from 'react-redux';
import { ordersAveragePriceSelector, ordersRiskSelector, ordersRiskPercSelector } from 'redux/selectors';
import { AppState } from 'redux/models/state';
// UTILS
import styles from './details-table.module.css';

// Reformats numbers
// ex. 123456.7890 => 123,456.7890
function format(num: any) {
  return num.toString().replace(/^[+-]?\d+/, function (int: any) {
    return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
}

function DetailsTable() {
  const { averagePrice, riskBTC, riskPerc } = useSelector(
    (state: AppState) => ({
      orders: state.preview.orders,
      averagePrice: ordersAveragePriceSelector(state),
      riskBTC: ordersRiskSelector(state),
      riskPerc: ordersRiskPercSelector(state),
    }),
    shallowEqual,
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
                </td>
              </tr>
            )}
          </>
        ) : null}
      </tbody>
    </table>
  );
}

export { DetailsTable };
