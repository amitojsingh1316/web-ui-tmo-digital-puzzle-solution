describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should be able to see the snack bar and utilize undo button', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="already-added-btn"]').then((initalLengthOfAddedButtons)=>{
          let lengthOfAddedButtons = Cypress.$(initalLengthOfAddedButtons).length;
              cy.get('[data-testing="want-to-read-btn"]').first().click();
              cy.get('[data-testing="already-added-btn"]').should('have.length', lengthOfAddedButtons + 1);
              cy.get('.mat-snack-bar-container').should('be.visible');
              cy.get('.mat-snack-bar-container').contains('Undo').click();
              cy.get('[data-testing="already-added-btn"]').should('have.length', lengthOfAddedButtons);
        });
      });
});
