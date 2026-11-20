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

describe('Accordion Block: Keyboard Accessibility Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('renders accordion titles as native buttons', () => {
    setPageTitle('Accordion Keyboard Semantics');
    addAccordionBlock();

    cy.get('.accordion:nth-child(2) > .title input').type('Focusable Panel');

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion').eq(0).find('.accordion-title').as('firstTitle');

    cy.get('@firstTitle').should('match', 'button[type="button"]');
    cy.get('@firstTitle').should('not.have.attr', 'role');
    cy.get('@firstTitle').should('have.attr', 'aria-expanded', 'false');
    cy.get('@firstTitle')
      .invoke('attr', 'aria-controls')
      .then((contentId) => {
        cy.get(`[id="${contentId}"]`).should('have.class', 'content');
      });
  });

  it('toggles panel state with Enter and Space keys', () => {
    setPageTitle('Accordion Keyboard Toggle');
    addAccordionBlock();

    cy.get('.accordion:nth-child(2) > .title input').type('Keyboard Panel');

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.get('.accordion').eq(0).find('.accordion-title').as('firstTitle');

    cy.get('@firstTitle').focus().type('{enter}');

    cy.get('.accordion').eq(0).find('.content').should('have.class', 'active');
    cy.get('@firstTitle').should('have.attr', 'aria-expanded', 'true');

    cy.get('@firstTitle').focus().type(' ');

    cy.get('.accordion')
      .eq(0)
      .find('.content')
      .should('not.have.class', 'active');
    cy.get('@firstTitle').should('have.attr', 'aria-expanded', 'false');
  });
});
