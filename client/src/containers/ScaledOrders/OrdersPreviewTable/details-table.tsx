import React from 'react';
import {formatPrice} from 'general/formatting';
import styles from './details-table.module.scss';
import {PREVIEW_CONTAINER} from 'data-test-ids';
import {useReduxSelector} from 'redux/helpers/hookHelpers';

export default function DetailsTable() {
  const {averagePrice, riskBTC, riskPerc} = useReduxSelector('averagePrice', 'riskBTC', 'riskPerc');

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
    console.log(riskPerc, 'RISK PERC', !isNaN(riskPerc));
    return riskBTC ? (
      <>
        <tr>
          <td>Risk:</td>
          <td>
            {riskBTC}
            <span className={styles.color_accent}> BTC</span>
          </td>
        </tr>
        {riskPerc !== 0 && (
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
