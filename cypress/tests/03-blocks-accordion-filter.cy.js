import { slateBeforeEach, slateAfterEach } from '../support/e2e';

const setPageTitle = (title) => {
  cy.clearSlateTitle();
  cy.getSlateTitle().type(title);
  cy.get('.documentFirstHeading').contains(title);
};

const addAccordionBlock = () => {
  cy.getSlate().click();
  cy.get('.ui.basic.icon.button.block-add-button').first().click();
  cy.get('.blocks-chooser .title').contains('Common').click();
  cy.get('.content.active.common .button.accordion')
    .contains('Accordion')
    .click({ force: true });
};

describe('Accordion Block: Filter Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('filters panels by title in view mode when filtering is enabled', () => {
    setPageTitle('Accordion Filter Test');
    addAccordionBlock();

    cy.get('.accordion:nth-child(2) > .title input').type('Introduction');
    cy.get('.accordion:nth-child(3) > .title input').type('Methods');
    cy.get('.accordion:nth-child(4) > .title input').type('Results');

    cy.get('.accordion-block legend').click();
    cy.get('label[for="field-filtering"]').click();

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('input[placeholder="Type to filter..."]')
      .should('be.visible')
      .type('met');

    cy.contains('.accordion-title span', 'Methods').should('exist');
    cy.contains('.accordion-title span', 'Introduction').should('not.exist');
    cy.contains('.accordion-title span', 'Results').should('not.exist');

    cy.get('input[placeholder="Type to filter..."]').clear();
    cy.contains('.accordion-title span', 'Introduction').should('exist');
    cy.contains('.accordion-title span', 'Methods').should('exist');
    cy.contains('.accordion-title span', 'Results').should('exist');
  });
});
