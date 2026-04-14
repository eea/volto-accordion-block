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

const setCheckbox = (field, checked) => {
  cy.get(`input#field-${field}`).then(($input) => {
    const isChecked = $input.prop('checked');
    if (isChecked !== checked) {
      cy.wrap($input)[checked ? 'check' : 'uncheck']({ force: true });
    }
  });
};

describe('Accordion Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('persists opened panel through the activeAccordion query parameter', () => {
    setPageTitle('Accordion Query State');
    addAccordionBlock();

    cy.get('.accordion:nth-child(2) > .title input').type('Panel A');
    cy.get('.accordion:nth-child(3) > .title input').type('Panel B');

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion').eq(1).find('.accordion-title').click();
    cy.url().should('include', 'activeAccordion=');
    cy.get('.accordion').eq(1).find('.content').should('have.class', 'active');

    cy.reload();

    cy.get('.accordion').eq(1).find('.content').should('have.class', 'active');
    cy.get('.accordion')
      .eq(0)
      .find('.content')
      .should('not.have.class', 'active');
  });

  it('opens the first panel by default when collapsed is disabled', () => {
    setPageTitle('Accordion Expanded Default');
    addAccordionBlock();

    cy.get('.accordion:nth-child(2) > .title input').type('Always Open First');
    cy.get('.accordion:nth-child(3) > .title input').type('Second Panel');

    cy.get('.accordion-block legend').click();
    setCheckbox('collapsed', false);

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion').eq(0).find('.content').should('have.class', 'active');
    cy.get('.accordion').eq(0).find('.accordion-title').click();
    cy.get('.accordion')
      .eq(0)
      .find('.content')
      .should('not.have.class', 'active');
  });
});
