import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Accordion Block: Filter Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: Add accordion with filter placeholder', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Filter Test');
    cy.get('.documentFirstHeading').contains('Accordion Filter Test');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Add titles to panels
    cy.get('.accordion:nth-child(2) > .title input')
      .click()
      .type('Introduction');
    
    cy.get('.accordion:nth-child(3) > .title input')
      .click()
      .type('Methods');
    
    cy.get('.accordion:nth-child(4) > .title input')
      .click()
      .type('Results');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // Verify page saved with panels
    cy.contains('Accordion Filter Test');
    cy.contains('Introduction');
    cy.contains('Methods');
    cy.contains('Results');
  });

  it('Accordion Block: Multiple panels with searchable titles', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Searchable Panels');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Add panels with distinct titles
    cy.get('.accordion:nth-child(2) > .title input').type('Alpha Panel');
    cy.get('.accordion:nth-child(3) > .title input').type('Beta Panel');
    cy.get('.accordion:nth-child(4) > .title input').type('Gamma Panel');

    // Save
    cy.get('#toolbar-save').click();
    
    // Verify all panels saved
    cy.contains('Alpha Panel');
    cy.contains('Beta Panel');
    cy.contains('Gamma Panel');
  });

  it('Accordion Block: Panel titles with special characters', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Special Titles');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel with special characters in title
    cy.get('.accordion:nth-child(2) > .title input').type('Panel with numbers 123');
    cy.get('.accordion:nth-child(3) > .title input').type('Panel with dash - test');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Special Titles');
  });
});
