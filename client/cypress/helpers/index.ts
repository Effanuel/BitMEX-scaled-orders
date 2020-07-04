type ScaledConfig = Record<'quantity' | 'n_tp' | 'start' | 'end' | 'stop', number> & {[key: string]: number};

export function fill() {
  return {
    scaledContainerFields: (config: ScaledConfig, contextDataTestId: Containers) => {
      cy.getByContainer(contextDataTestId).within(() => {
        for (const filter in config) {
          cy.log(`Types in '${filter}' field`)
            .get(`input[id="${filter}"]`)
            .type(config[filter].toString())
            .should('have.value', config[filter]);
        }
      });
    },
  };
}
