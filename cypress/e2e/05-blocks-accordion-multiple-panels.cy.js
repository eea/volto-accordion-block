import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Accordion Block: Multiple Panels Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: Add multiple panels with content', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Multiple Panels');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Add three panels
    cy.get('.accordion:nth-child(2) > .title input').type('Introduction');
    cy.get('.accordion:nth-child(3) > .title input').type('Methods');
    cy.get('.accordion:nth-child(4) > .title input').type('Results');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Multiple Panels');
  });

  it('Accordion Block: Reorder panels', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Reorder');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panels
    cy.get('.accordion:nth-child(2) > .title input').type('First');
    cy.get('.accordion:nth-child(3) > .title input').type('Second');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Reorder');
  });

  it('Accordion Block: Delete panel', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Delete Panel');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panels
    cy.get('.accordion:nth-child(2) > .title input').type('Keep Panel');
    cy.get('.accordion:nth-child(3) > .title input').type('Delete Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Delete Panel');
  });

  it('Accordion Block: Panel with rich text content', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Rich Text');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel title
    cy.get('.accordion:nth-child(2) > .title input').type('Rich Content Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Rich Text');
  });
});
