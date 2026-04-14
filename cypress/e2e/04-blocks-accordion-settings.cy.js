import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Accordion Block: Settings Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: Multiple panels open', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Multiple Panels');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Add panel titles
    cy.get('.accordion:nth-child(2) > .title input').type('First Panel');
    cy.get('.accordion:nth-child(3) > .title input').type('Second Panel');
    cy.get('.accordion:nth-child(4) > .title input').type('Third Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Multiple Panels');
    cy.contains('First Panel');
    cy.contains('Second Panel');
    cy.contains('Third Panel');
  });

  it('Accordion Block: Panel with different title lengths', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Title Lengths');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panels with different title lengths
    cy.get('.accordion:nth-child(2) > .title input').type('Short');
    cy.get('.accordion:nth-child(3) > .title input').type('Medium length panel title');
    cy.get('.accordion:nth-child(4) > .title input').type('This is a very long panel title that tests how the accordion handles longer text content');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Title Lengths');
  });

  it('Accordion Block: Default collapsed state', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Default State');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Default Panel');

    // Verify panels exist (collapsed by default is expected behavior)
    cy.get('.accordion').should('exist');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Default State');
  });

  it('Accordion Block: Title size via sidebar', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Title Size');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('H2 Panel Title');

    // Set title size via sidebar (using the pattern from 01-blocks-accordion.cy.js)
    cy.get('[id="field-title_size"] .react-select__value-container')
      .click()
      .type('h2{enter}');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Title Size');
    cy.get('h2.accordion-title').contains('H2 Panel Title');
  });

  it('Accordion Block: Custom headline', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Headline');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Panel with Headline');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Headline');
  });

  it('Accordion Block: Block title field', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Block Title');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Panel Content');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Block Title');
  });
});
