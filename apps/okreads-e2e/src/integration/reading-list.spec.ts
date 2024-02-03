


describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able remove book from the list see snackbar ', () => {
    //Open Reading list
    cy.get('[data-testing="toggle-reading-list"]').click();

    
    cy.get('[data-testing="remove-book-button"]').then((initalLengthOfReadingList)=>{
      let lengthOfReadingList = Cypress.$(initalLengthOfReadingList).length;
      //Remove First book
      cy.get('[data-testing="remove-book-button"]').first().click();
          
      // Test Snack bar visiblity
      cy.get('.mat-snack-bar-container').should('be.visible');

      // Test reading list after undo
      cy.get('[data-testing="remove-book-button"]').should('have.length', lengthOfReadingList-1);

      // Test snack bar has Undo button and click
      cy.get('.mat-snack-bar-container').contains('Undo').click();

      // Test reading list after undo
      cy.get('[data-testing="remove-book-button"]').should('have.length', lengthOfReadingList);
    });
  });
});
