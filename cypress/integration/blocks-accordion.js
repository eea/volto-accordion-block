import { setupBeforeEach, tearDownAfterEach } from '../support';

describe('Blocks Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Accordion Block: add accordion content', () => {
    // Change page title
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .clear()
      .type('My Add-on Page')
      .get('.documentFirstHeading span[data-text]')
      .contains('My Add-on Page');

    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block').type(
      '{enter}',
    );

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.ui.basic.icon.button.accordion').contains('Accordion').click();

    //
    cy.get('.accordion:nth-child(2) > .active input')
      .click()
      .type('panel 1')
      .should('have.value', 'panel 1');
    cy.wait(1000);
    cy.get('.accordion:nth-child(2) > .content:nth-child(2)')
      .first()
      .within(() => {
        cy.get('.public-DraftStyleDefault-block:nth-child(1)')
          .should('have.value', '')
          .invoke('attr', 'tabindex', 1)
          .type('children', { delay: 50 });
      });

    cy.get('.accordion:nth-child(3) > .title input').click();
    cy.get('.accordion:nth-child(3) > .title input').type('panel 2');
    cy.get('.accordion:nth-child(3) > .title > .icon').click();
    cy.get('.accordion:nth-child(3) > .content:nth-child(2)')
      .first()
      .within(() => {
        cy.get('.public-DraftStyleDefault-block:nth-child(1)')
          .should('have.value', '')
          .invoke('attr', 'tabindex', 1)
          .type('children', { delay: 50 });
      });
    cy.get('#toolbar-save path').click({ force: true });

    //after saving
    cy.get('div.accordion-title > span').contains('panel 1');
    cy.get('div.content')
      .should('have.class', 'active')
      .within(() => {
        //using regex here,as there's a delay in typing letters in slate which do not uses input
        cy.get('p').contains('children');
      });
    cy.get('.accordion:nth-child(2) > .title > .icon').click();
    cy.get('div.content')
      .should('have.class', 'active')
      .within(() => {
        cy.get('p').contains('children');
      });
  });
  it('Accordion Block: Empty', () => {
    // Change page title
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .clear()
      .type('My Add-on Page')
      .get('.documentFirstHeading span[data-text]')
      .contains('My Add-on Page');

    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block').type(
      '{enter}',
    );

    // Add metadata block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.ui.basic.icon.button.accordion').contains('Accordion').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
  });

  it('Accordion Block: Change Title', () => {
    // Change page title
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .clear()
      .type('My Add-on Page')
      .get('.documentFirstHeading span[data-text]')
      .contains('My Add-on Page');

    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block').type(
      '{enter}',
    );

    // Add accordion block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.ui.basic.icon.button.accordion').contains('Accordion').click();

    //
    cy.get('.accordion:nth-child(2) > .active input')
      .click()
      .type('Accordion panel 1')
      .should('have.value', 'Accordion panel 1');

    cy.get('[id="field-title_size"] .react-select__value-container')
      .click()
      .type('h2{enter}');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.get('h2.accordion-title').contains('Accordion panel 1');
  });
});
