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

describe('Accordion Block: Edge Cases Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('does not render empty accordion panels in view mode', () => {
    setPageTitle('Accordion Empty Panels');
    addAccordionBlock();

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion').should('have.length', 0);
    cy.get('.accordion-title').should('not.exist');
  });

  it('renders all duplicate panel titles', () => {
    setPageTitle('Accordion Duplicate Titles');
    addAccordionBlock();

    cy.get('.accordion:nth-child(2) > .title input').type('Same Title');
    cy.get('.accordion:nth-child(3) > .title input').type('Same Title');
    cy.get('.accordion:nth-child(4) > .title input').type('Different Title');

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion-title span').then(($titles) => {
      const duplicates = [...$titles].filter(
        (el) => el.textContent.trim() === 'Same Title',
      );
      expect(duplicates).to.have.length(2);
    });
  });

  it('renders very long panel titles', () => {
    setPageTitle('Accordion Long Title');
    addAccordionBlock();

    const longTitle = 'This is a very long panel title '.repeat(8).trim();
    cy.get('.accordion:nth-child(2) > .title input').type(longTitle);

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.contains('.accordion-title span', longTitle).should('exist');
  });
});
