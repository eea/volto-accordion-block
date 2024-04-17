import { slateLayoutBeforeEach, slateLayoutAfterEach } from '../support/e2e';

describe('ControlPanel: Dexterity Content-Types Layout', () => {
  beforeEach(slateLayoutBeforeEach);
  afterEach(slateLayoutAfterEach);

  it('Edit Blocks Layout for Book', () => {
    cy.visit('/controlpanel/dexterity-types');
    cy.get('a[href="/controlpanel/dexterity-types/book"]').should(
      'have.text',
      'book',
    );
    cy.navigate('/controlpanel/dexterity-types/book/layout');
    cy.get('#page-controlpanel-layout').contains(
      'Can not edit Layout for book',
    );
    cy.wait(1000);

    cy.get('#page-controlpanel-layout button').click();

    // Wait a bit for draftjs to load, without this the title block
    // custom placeholder is missing and cypress gives a timeout error
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click();

    cy.get('#field-allowedBlocks.react-select-container')
      .click()
      .type('Image{enter}');
    cy.get('#field-allowedBlocks.react-select-container')
      .click()
      .type('Text{enter}');

    // By default all should be collapsed (no active class on first)
    cy.get('.accordion:nth-child(2)').should('not.have.class', 'active');

    cy.get('.accordion:nth-child(2) > .title input')
      .click()
      .type('Chapter 1')
      .should('have.value', 'Chapter 1');

    cy.wait(500);

    cy.get(
      '.accordion:nth-child(2) .content .slate-editor [contenteditable=true]',
    )
      .last()
      .focus()
      .click()
      .type('Once upon a time...{enter}');

    cy.get(
      '.accordion:nth-child(2) .content .slate-editor [contenteditable=true]',
    )
      .last()
      .focus()
      .click()
      .type('/');
    cy.wait(500);
    cy.get('.power-user-menu a.item').should('have.length', 1);

    cy.get('.accordion:nth-child(3) > .title input')
      .click()
      .type('Chapter 2')
      .should('have.value', 'Chapter 2');

    cy.get('#toolbar-save').click();

    cy.visit('/cypress');
    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');

    // Change book title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My First Book');
    cy.get('.documentFirstHeading').contains('My First Book');

    cy.get('.accordion:nth-child(3) > .title > .icon').click();
    cy.wait(500);
    cy.get(
      '.accordion:nth-child(3) .content .slate-editor [contenteditable=true]',
    )
      .last()
      .focus()
      .click()
      .type('The quick brown fox jumps over the lazy dog{enter}');

    cy.get(
      '.accordion:nth-child(3) .content .slate-editor [contenteditable=true]',
    )
      .last()
      .focus()
      .click()
      .type('/');
    cy.wait(500);
    cy.get('.power-user-menu a.item').should('have.length', 1);
    cy.get(
      '.accordion:nth-child(3) .content .slate-editor [contenteditable=true]',
    )
      .last()
      .focus()
      .click()
      .type('Image{enter}');
    cy.get('.accordion:nth-child(3) .content .block.image input[type="text"]')
      .click()
      .type(
        'https://eea.github.io/volto-eea-design-system/img/eea_icon.png{enter}',
      );

    cy.get('.accordion:nth-child(4) > .title input')
      .click()
      .type('Chapter 3')
      .should('have.value', 'Chapter 3');

    cy.get('.accordion-block legend').click();
    cy.get('[id="field-title_size"] .react-select__value-container')
      .click()
      .type('h2{enter}');

    cy.get('#toolbar-save').click();
    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('.accordion:nth-child(1) > h2.title').contains('Chapter 1');
    cy.get('.accordion:nth-child(2) > h2.title').contains('Chapter 2');
    cy.get('.accordion:nth-child(3) > h2.title').contains('Chapter 3');

    cy.get('.accordion:nth-child(1) > h2.title').click();
    cy.get('.accordion:nth-child(1) .content').contains('Once upon a time...');

    cy.get('.accordion:nth-child(2) > h2.title').click();
    cy.get('.accordion:nth-child(2) .content').contains(
      'The quick brown fox jumps over the lazy dog',
    );
    cy.get('.accordion:nth-child(2) .content img').should(
      'have.attr',
      'src',
      'https://eea.github.io/volto-eea-design-system/img/eea_icon.png',
    );
  });
});
