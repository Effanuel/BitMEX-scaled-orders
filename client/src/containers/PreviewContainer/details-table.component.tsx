import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';

import {ordersAveragePriceSelector, ordersRiskSelector, ordersRiskPercSelector} from 'redux/selectors';
import {AppState} from 'redux/models/state';

import {formatPrice} from 'general/formatting';
import styles from './details-table.module.css';
import {PREVIEW_CONTAINER} from 'data-test-ids';

export default function DetailsTable() {
  const {averagePrice, riskBTC, riskPerc} = useSelector(
    (state: AppState) => ({
      averagePrice: ordersAveragePriceSelector(state),
      riskBTC: ordersRiskSelector(state),
      riskPerc: ordersRiskPercSelector(state),
    }),
    shallowEqual,
  );

  function renderPriceSection() {
    return (
      <tr>
        <td>Average price:</td>
        <td>
          {formatPrice(averagePrice || null)}
          <span className={styles.color_accent}> USD</span>
        </td>
      </tr>
    );
  }

  function renderRiskSection() {
    return riskBTC ? (
      <>
        <tr>
          <td>Risk:</td>
          <td>
            {riskBTC}
            <span className={styles.color_accent}> BTC</span>
          </td>
        </tr>
        {!isNaN(riskPerc) && (
          <tr data-testid={PREVIEW_CONTAINER.RISK_PERC_ROW}>
            <td>Risk(%):</td>
            <td>
              {riskPerc}
              <span className={styles.color_accent}> %</span>
            </td>
          </tr>
        )}
      </>
    ) : null;
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
        {renderPriceSection()}
        {renderRiskSection()}
      </tbody>
    </table>
  );
}
