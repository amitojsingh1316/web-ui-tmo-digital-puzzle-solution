describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should see search results as I am typing', () => {
    const searchTerm = 'java'; // Initial part of the title to type
    const expectedResultsCount = 2; // Expected number of search results

    // Typing the search terms and checking results dynamically
    cy.get('input[type="search"]').type(searchTerm);
    cy.wait(500);
    // Assert that the results are updating as the user type
    cy.get('[data-testing="book-item"]').should('have.length.gte', expectedResultsCount);
});
});
