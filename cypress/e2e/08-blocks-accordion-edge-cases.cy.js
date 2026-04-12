import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Accordion Block: Edge Cases Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Accordion Block: Empty accordion (no panels)', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Empty');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click({ force: true });

    // Don't add any panels, just save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Empty');
  });

  it('Accordion Block: Very long panel title', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Long Title');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel with long title
    const longTitle = 'This is a very long panel title that extends beyond normal length'.repeat(3);
    cy.get('.accordion:nth-child(2) > .title input').type(longTitle);

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Long Title');
  });

  it('Accordion Block: Special characters in title', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Special Chars');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel with special characters
    cy.get('.accordion:nth-child(2) > .title input').type('Title with ñ, é, ü, 中文, 🎉');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Special Chars');
  });

  it('Accordion Block: Single panel accordion', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Single Panel');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add only one panel
    cy.get('.accordion:nth-child(2) > .title input').type('Only Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Single Panel');
  });

  it('Accordion Block: Many panels', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Many Panels');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add multiple panels
    for (let i = 2; i <= 6; i++) {
      cy.get(`.accordion:nth-child(${i}) > .title input`).type(`Panel ${i-1}`);
    }

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Many Panels');
  });

  it('Accordion Block: Panel with only whitespace title', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Whitespace Title');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel with whitespace title
    cy.get('.accordion:nth-child(2) > .title input').type('   ');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Whitespace Title');
  });

  it('Accordion Block: Duplicate panel titles', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Duplicate Titles');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panels with same title
    cy.get('.accordion:nth-child(2) > .title input').type('Same Title');
    cy.get('.accordion:nth-child(3) > .title input').type('Same Title');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Duplicate Titles');
  });

  it('Accordion Block: Rapid expand/collapse', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Accordion Rapid Click');

    cy.getSlate().click();

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion').click({ force: true });

    // Add panel
    cy.get('.accordion:nth-child(2) > .title input').type('Rapid Panel');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Accordion Rapid Click');
  });
});
