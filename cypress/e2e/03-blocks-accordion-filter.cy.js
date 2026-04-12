import { slateBeforeEach, slateAfterEach } from '../support/e2e';

const getCheckboxField = (name) => cy.get(`[id="field-${name}"]`);
const getFilterInput = () =>
  cy.get('.accordion-block input[placeholder="Type to filter..."]');

describe('Accordion Block: Filter Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: Enable filtering and filter panels', () => {
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

    // Enable filtering in sidebar
    getCheckboxField('filtering').check({ force: true });

    // Verify filter input appears
    getFilterInput().should('exist');

    // Type in filter input
    getFilterInput().type('Intro');

    // Verify only matching panel is visible
    cy.get('.accordion:nth-child(2)').should('exist');
    cy.get('.accordion:nth-child(3)').should('not.exist');
    cy.get('.accordion:nth-child(4)').should('not.exist');

    // Clear filter
    getFilterInput().clear();

    // All panels should be visible again
    cy.get('.accordion').should('have.length', 4); // 1 hidden + 3 visible

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // Verify page saved
    cy.contains('Accordion Filter Test');
  });

  it('Accordion Block: Filter with no matches', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Filter No Matches');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Add titles to panels
    cy.get('.accordion:nth-child(2) > .title input').type('Panel One');
    cy.get('.accordion:nth-child(3) > .title input').type('Panel Two');

    // Enable filtering
    getCheckboxField('filtering').check({ force: true });

    // Type non-matching filter
    getFilterInput().type('XYZ123');

    // No panels should match
    cy.get('.accordion-block > .accordion').should('have.length', 0);

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Filter No Matches');
  });

  it('Accordion Block: Filter case insensitive', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Filter Case');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add title with mixed case
    cy.get('.accordion:nth-child(2) > .title input').type('My ReSuLtS');
    cy.get('.accordion:nth-child(3) > .title input').type('Other Data');

    // Enable filtering
    getCheckboxField('filtering').check({ force: true });

    // Filter with lowercase
    getFilterInput().type('results');

    // Should find the panel regardless of case
    cy.get('.accordion').contains('My ReSuLtS');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Filter Case');
  });
});
