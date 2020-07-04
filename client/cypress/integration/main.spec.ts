import {SCALED_CONTAINER, PREVIEW_CONTAINER, GLOBAL} from '../../src/data-test-ids';
import {ResponseBuilder} from './responses';
import {fill} from '../helpers/index';
import {EXCHANGES} from '../exchangeMocks/index';

const BASE_URL = 'http://localhost:3000/';

describe('Preview container', () => {
  const configWithStop = {
    quantity: 123,
    n_tp: 3,
    start: 555,
    end: 555,
    stop: 888,
  };

  const mockResponse = ResponseBuilder(EXCHANGES.bitmex);

  describe('Details table', () => {
    it('tests regular flow', () => {
      cy.visit(BASE_URL).server();
      cy.route(mockResponse.getBalance()).as('GET_BALANCE');
      cy.route(mockResponse.bulkOrders()).as('BULK_ORDERS');

      cy.wait('@GET_BALANCE');

      fill().scaledContainerFields(configWithStop, 'ScaledOrders');
      cy.getByTestID(SCALED_CONTAINER.PREVIEW_BUTTON).click();

      cy.getByTestID(PREVIEW_CONTAINER.RISK_PERC_ROW).toBeDefined();
      cy.getByTestID(PREVIEW_CONTAINER.STOP_ORDER_ROW).toBeDefined();

      cy.getByTestID(SCALED_CONTAINER.SUBMIT_BUTTON).click().wait('@BULK_ORDERS');

      cy.getByTestID(GLOBAL.SNACKBAR).toBeDefined();
    });
  });
});
