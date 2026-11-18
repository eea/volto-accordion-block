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

const addPanelTitles = (titles) => {
  titles.forEach((title, index) => {
    cy.get(`.accordion:nth-child(${index + 2}) > .title input`).type(title);
  });
};

const setCheckbox = (field, checked) => {
  cy.get(`input#field-${field}`).then(($input) => {
    const isChecked = $input.prop('checked');
    if (isChecked !== checked) {
      cy.wrap($input)[checked ? 'check' : 'uncheck']({ force: true });
    }
  });
};

describe('Accordion Block: Settings Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('keeps panels collapsed by default', () => {
    setPageTitle('Accordion Collapsed Default');
    addAccordionBlock();
    addPanelTitles(['First Panel', 'Second Panel']);

    cy.get('.accordion-block legend').click();
    setCheckbox('collapsed', true);

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion .content.active').should('have.length', 0);
    cy.get('.accordion').eq(0).find('.accordion-title').click();
    cy.get('.accordion').eq(0).find('.content').should('have.class', 'active');
  });

  it('allows multiple open panels when non-exclusive is enabled', () => {
    setPageTitle('Accordion Non Exclusive');
    addAccordionBlock();
    addPanelTitles(['Panel A', 'Panel B', 'Panel C']);

    cy.get('.accordion-block legend').click();
    setCheckbox('collapsed', true);
    setCheckbox('non_exclusive', true);

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion').eq(0).find('.accordion-title').click();
    cy.get('.accordion').eq(1).find('.accordion-title').click();

    cy.get('.accordion').eq(0).find('.content').should('have.class', 'active');
    cy.get('.accordion').eq(1).find('.content').should('have.class', 'active');
  });

  it('closes previous panel when non-exclusive is disabled', () => {
    setPageTitle('Accordion Exclusive');
    addAccordionBlock();
    addPanelTitles(['Panel A', 'Panel B']);

    cy.get('.accordion-block legend').click();
    setCheckbox('collapsed', true);
    setCheckbox('non_exclusive', false);

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion').eq(0).find('.accordion-title').click();
    cy.get('.accordion').eq(1).find('.accordion-title').click();

    cy.get('.accordion')
      .eq(0)
      .find('.content')
      .should('not.have.class', 'active');
    cy.get('.accordion').eq(1).find('.content').should('have.class', 'active');
  });
});
