/// <reference types="Cypress" />

describe('Search Box', () => {
  before(() => {
    cy.visit('/');
  });

  it('should not display any search results when I enter a single alphanumeric character into the pick up location', () => {
    cy.get('input').type('a');
    cy.wait(500);
    cy.get('.c-search-list__list li').should('not.exist');
    cy.get('input').clear();
  });

  it('should display the list of search results when I enter 2 or more alphanumeric characters into the pick up location', () => {
    cy.get('input').type('ba');
    cy.get('.c-search-list__list li').should('have.length', 6);
    cy.get('input').clear();
  });

  it('should display the message "No results found" when a search term that is not recognised is entered in the pick up location', () => {
    cy.get('input').type('-----');
    cy.get('.c-search-list__nores').should('exist');
  });

  it('should hide the list of search results when blur', () => {
    cy.get('input').blur();
    cy.get('.c-search-list__list li').should('not.exist');
    cy.get('input').clear();
  });

  it('should hide the list of search results when I remove the search term leaving only 1 character', () => {
    cy.get('input').type('a');
    cy.wait(500);
    cy.get('.c-search-list__list li').should('not.exist');
  });
});
