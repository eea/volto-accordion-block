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
    // Click the title block to select it and show sidebar
    cy.get('.block.title').first().click();
    // Click Settings tab in sidebar (Volto 18 has Block/Order/Settings tabs)
    cy.contains('.sidebar-container a.item', 'Settings').click();
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.accordion')
      .contains('Accordion')
      .click();

    cy.get('.block-editor-accordion').last().as('accordionBlock');

    cy.get('#field-allowedBlocks.react-select-container').click();
    cy.get('#field-allowedBlocks.react-select-container input').type(
      'Image{enter}',
      {
        force: true,
      },
    );
    cy.get('#field-allowedBlocks.react-select-container').click();
    cy.get('#field-allowedBlocks.react-select-container input').type(
      'Text{enter}',
      {
        force: true,
      },
    );

    cy.get('@accordionBlock')
      .find('input[placeholder="Enter Title"]')
      .eq(0)
      .as('chapter1Title');

    cy.get('@chapter1Title').click({ force: true });
    cy.get('@chapter1Title')
      .type('Chapter 1', { force: true })
      .should('have.value', 'Chapter 1');

    cy.get('@chapter1Title')
      .parents('.accordion-title')
      .first()
      .click({ position: 'left', force: true });

    cy.get('@chapter1Title')
      .parents('.ui.accordion')
      .first()
      .as('chapter1Panel');

    cy.wait(1000);
    cy.getIfExists(
      '.block-editor-accordion .ui.accordion:first-of-type .rah-static--height-auto',
      () => {
        // Volto 18: accordion is open
        cy.get('@chapter1Panel')
          .find('.content .slate-editor [contenteditable=true]')
          .should('have.length.at.least', 1)
          .last()
          .focus()
          .click({ force: true })
          .type('Once upon a time...{enter}', { force: true });

        cy.get('@chapter1Panel')
          .find('.content .slate-editor [contenteditable=true]')
          .should('have.length.at.least', 1)
          .last()
          .focus()
          .click({ force: true })
          .type('/', { force: true });
        cy.wait(500);
        cy.get('.power-user-menu a.item').should('have.length', 1);
      },
      () => {
        // Volto 17: accordion is closed
        cy.get('@chapter1Panel').find('svg').click();
        cy.get('@chapter1Panel')
          .find('.content .slate-editor [contenteditable=true]')
          .should('have.length.at.least', 1)
          .last()
          .focus()
          .click({ force: true })
          .type('Once upon a time...{enter}', { force: true });

        cy.get('@chapter1Panel')
          .find('.content .slate-editor [contenteditable=true]')
          .should('have.length.at.least', 1)
          .last()
          .focus()
          .click({ force: true })
          .type('/', { force: true });
        cy.wait(500);
        cy.get('.power-user-menu a.item').should('have.length', 1);
      },
    );

    cy.get('@accordionBlock')
      .find('input[placeholder="Enter Title"]')
      .eq(1)
      .as('chapter2Title');

    cy.get('@chapter2Title').click({ force: true });
    cy.get('@chapter2Title')
      .type('Chapter 2', { force: true })
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
    // Click directly on the menu item to insert the image block
    cy.get('.power-user-menu a.item').first().click();

    // Wait for the image block to be inserted and visible
    cy.wait(1000);

    // The image block was just inserted - enter URL
    const url =
      'https://eea.github.io/volto-eea-design-system/img/eea_icon.png';

    // In Volto, the image block has buttons for browse/upload/URL
    // The third button (link icon) enables URL input mode
    // Look in the image block for buttons and click the last one (link/URL)
    cy.get('.accordion:nth-child(3) .content')
      .first()
      .within(() => {
        // The image block has multiple buttons - click the link/URL button (usually last or has link icon)
        cy.get('button.ui.button, button.icon').last().click({ force: true });
      });

    cy.wait(500);

    // Now the URL input should be visible - find and fill it
    cy.get(
      '.accordion:nth-child(3) .content input[type="text"], .accordion:nth-child(3) .content .ui.input input',
    )
      .first()
      .click({ force: true })
      .clear({ force: true })
      .type(`${url}{enter}`, { force: true });

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
