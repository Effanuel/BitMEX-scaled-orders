type Class<T> = new (...args: unknown[]) => T;
type Containers = 'ScaledOrders' | 'MarketOrder' | 'PreviewContainer';

declare namespace Cypress {
  interface Chainable {
    getByTestID(value: string): Chainable<Element>;
    getByContainer(value: Containers): Chainable<Element>;
    toBeDefined(): Chainable<Element>;
    waitRoute(options: Partial<Cypress.RouteOptions>): Chainable<Element>;
  }
}
