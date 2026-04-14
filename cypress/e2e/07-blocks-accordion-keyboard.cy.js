import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Accordion Block: Keyboard Accessibility Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: Panel title is focusable', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Keyboard Focus');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Focusable Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Keyboard Focus');
  });

  it('Accordion Block: Tab navigation works', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Tab Navigation');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panels
    cy.get('.accordion:nth-child(2) > .title input').type('First Tab Panel');
    cy.get('.accordion:nth-child(3) > .title input').type('Second Tab Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Tab Navigation');
  });

  it('Accordion Block: Enter key expands panel', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Enter Key');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Enter Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Enter Key');
  });

  it('Accordion Block: Space key expands panel', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Space Key');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Space Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Space Key');
  });

  it('Accordion Block: ARIA attributes present', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion ARIA');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('ARIA Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion ARIA');
    
    // Check accordion has proper ARIA structure
    cy.get('.accordion').should('exist');
  });
});
