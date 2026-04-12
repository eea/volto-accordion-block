import { slateBeforeEach, slateAfterEach } from '../support/e2e';

const getCheckboxField = (name) => cy.get(`[id="field-${name}"]`);
const getTextField = (name) => cy.get(`[id="field-${name}"]`);
const getSelectField = (name) =>
  cy.get(`[id="field-${name}"] .react-select__value-container`);

describe('Accordion Block: Settings Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: Non-exclusive mode - multiple panels open', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Non-Exclusive');

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

    // Enable non_exclusive mode via sidebar
    getCheckboxField('non_exclusive').check({ force: true });

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Non-Exclusive');
  });

  it('Accordion Block: Right arrows setting', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Right Arrows');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel title
    cy.get('.accordion:nth-child(2) > .title input').type('Panel with Right Arrow');

    // Enable right_arrows via sidebar
    getCheckboxField('right_arrows').check({ force: true });

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Right Arrows');
  });

  it('Accordion Block: Collapsed by default', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Collapsed');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Collapsed Panel');

    // Enable collapsed via sidebar
    getCheckboxField('collapsed').check({ force: true });

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Collapsed');
  });

  it('Accordion Block: Title size h2', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Title Size');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('H2 Panel Title');

    // Set title size via sidebar
    getSelectField('title_size').click().type('h2{enter}');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Title Size');
    cy.get('h2.accordion-title').contains('H2 Panel Title');
  });

  it('Accordion Block: Headline setting', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Headline');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Panel with Headline');

    // Set headline via sidebar
    getTextField('headline').type('Accordion Headline Text');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Headline');
  });

  it('Accordion Block: Title block setting', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Block Title');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Panel Content');

    // Set title via sidebar
    getTextField('title').type('My Accordion Title');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Block Title');
  });
});
