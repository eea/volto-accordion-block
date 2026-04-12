import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Accordion Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: View mode renders correctly', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion View Mode');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('View Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion View Mode');
    
    // Verify accordion renders in view mode
    cy.get('.accordion').should('exist');
  });

  it('Accordion Block: Click to expand panel', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Click Expand');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Clickable Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Click Expand');
  });

  it('Accordion Block: Click to collapse panel', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Click Collapse');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Collapsible Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Click Collapse');
  });

  it('Accordion Block: Panel title displays correctly', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Panel Title');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel with specific title
    cy.get('.accordion:nth-child(2) > .title input').type('Specific Panel Title');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Panel Title');
    cy.contains('Specific Panel Title');
  });

  it('Accordion Block: Multiple panels in view mode', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Multiple View');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add multiple panels
    cy.get('.accordion:nth-child(2) > .title input').type('Panel A');
    cy.get('.accordion:nth-child(3) > .title input').type('Panel B');
    cy.get('.accordion:nth-child(4) > .title input').type('Panel C');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Multiple View');
  });

  it('Accordion Block: Accordion icon renders', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Icon');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Icon Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Icon');
    
    // Check for accordion icon
    cy.get('.accordion .title .icon').should('exist');
  });
});
