import './commands';

Cypress.Commands.add('getByTestID', (value) => cy.get(`[data-testid="${value}"]`));
Cypress.Commands.add('getByContainer', (value) => cy.get(`[data-testid="${value}"]`));
Cypress.Commands.add('waitRoute', (response) => cy.route(response).as('RESPONSE').wait('@RESPONSE'));

// jest commands
Cypress.Commands.add('toBeDefined', {prevSubject: true}, (subject) => cy.wrap(subject).should('exist'));
