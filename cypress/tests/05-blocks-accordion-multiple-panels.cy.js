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

const typePanelContent = (panelNthChild, text) => {
  cy.get(`.accordion:nth-child(${panelNthChild}) > .title > .icon`).click({
    force: true,
  });

  cy.getIfExists(
    `.accordion:nth-child(${panelNthChild}) .content .public-DraftStyleDefault-block:nth-child(1)`,
    () => {
      cy.get(
        `.accordion:nth-child(${panelNthChild}) .content .public-DraftStyleDefault-block:nth-child(1)`,
      )
        .invoke('attr', 'tabindex', 1)
        .type(text, { delay: 50 });
    },
    () => {
      cy.get(
        `.accordion:nth-child(${panelNthChild}) .content .slate-editor [contenteditable=true]`,
      )
        .last()
        .focus()
        .click({ force: true })
        .type(text, { delay: 50 });
    },
  );
};

describe('Accordion Block: Multiple Panels Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('persists independent content in multiple panels', () => {
    setPageTitle('Accordion Multi Panel Content');
    addAccordionBlock();

    cy.get('.accordion:nth-child(2) > .title input').type('Chapter 1');
    cy.get('.accordion:nth-child(3) > .title input').type('Chapter 2');
    cy.get('.accordion:nth-child(4) > .title input').type('Chapter 3');

    typePanelContent(3, 'Second chapter body');
    typePanelContent(4, 'Third chapter body');

    cy.get('#toolbar-save').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);

    cy.contains('.accordion-title', 'Chapter 2').click();
    cy.contains('.accordion .content', 'Second chapter body').should('exist');

    cy.contains('.accordion-title', 'Chapter 3').click();
    cy.contains('.accordion .content', 'Third chapter body').should('exist');
  });
});
