describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="want-to-read-btn"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

it('Then: clicking on complete button removes the book from Reading List',() =>{
  cy.get('[data-testing="complete-button"]').then((initalLengthOfAddedButtons)=>{
    const lengthOfAddedButtons = Cypress.$(initalLengthOfAddedButtons).length;
      cy.get('[data-testing="complete-button"]').first().click();
      //Number of books in reading list should be decreased by one
        cy.get('[data-testing="complete-button"]').should('have.length', lengthOfAddedButtons - 1);
      });

});

it('Then: clicking on complete button adds the book to Completed List',() =>{
  cy.get('[data-testing="remove-completed-button"]').then((initalLengthOfAddedButtons)=>{
    const lengthOfAddedButtons = Cypress.$(initalLengthOfAddedButtons).length;
      cy.get('[data-testing="complete-button"]').first().click();
      //Number of books in completed list should be increased by one
        cy.get('[data-testing="remove-completed-button"]').should('have.length', lengthOfAddedButtons + 1);
      });

});

it('Then: clicking on Remove completed book button removes book from Completed List',() =>{
  
  cy.get('[data-testing="remove-completed-button"]').then((initalLengthOfAddedButtons)=>{
    const lengthOfAddedButtons = Cypress.$(initalLengthOfAddedButtons).length;
    cy.get('[data-testing="remove-completed-button"]').first().click();
    //Number of books in reading list should be decreased by one
        cy.get('[data-testing="remove-completed-button"]').should('have.length', lengthOfAddedButtons - 1);
      });
});

});

