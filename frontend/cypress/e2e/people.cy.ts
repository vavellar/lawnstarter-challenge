describe('People view', () => {
  const peopleDetails = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    eye_color: 'blue',
    hair_color: 'blond',
    height: '172',
    mass: '77',
    films_details: [{ id: 1, title: 'A New Hope' }],
  };

  const movieDetails = {
    title: 'A New Hope',
    opening_crawl: 'It is a period of civil war. Rebel spaceships.',
    characters_details: [{ id: 1, name: 'Luke Skywalker' }],
  };

  beforeEach(() => {
    cy.intercept('GET', '**/api/people/details/1', {
      statusCode: 200,
      body: peopleDetails,
      delay: 100,
    }).as('peopleDetails');
  });

  it('renders person details and movies', () => {
    cy.visit('/people/1');

    cy.contains('Loading...').should('be.visible');
    cy.wait('@peopleDetails');

    cy.contains('h1', 'Luke Skywalker').should('be.visible');
    cy.contains('h2', 'Details').should('be.visible');
    cy.contains('Birth Year:').should('be.visible');
    cy.contains('h2', 'Movies').should('be.visible');
    cy.contains('a', 'A New Hope').should('be.visible');
  });

  it('navigates to movie details when a film is clicked', () => {
    cy.intercept('GET', '**/api/movies/details/1', {
      statusCode: 200,
      body: movieDetails,
    }).as('movieDetails');

    cy.visit('/people/1');
    cy.wait('@peopleDetails');

    cy.contains('a', 'A New Hope').click();
    cy.wait('@movieDetails');

    cy.location('pathname').should('eq', '/movie/1');
    cy.contains('h1', 'A New Hope').should('be.visible');
  });

  it('returns to home when clicking back', () => {
    cy.visit('/people/1');
    cy.wait('@peopleDetails');

    cy.contains('button', 'BACK TO SEARCH').click();
    cy.location('pathname').should('eq', '/');
  });

  it('shows error message when details are not found', () => {
    cy.intercept('GET', '**/api/people/details/1', {
      statusCode: 500,
      body: { detail: 'Not Found' },
    }).as('peopleDetailsError');

    cy.visit('/people/1');
    cy.wait('@peopleDetailsError');

    cy.contains('strong', 'Error!').should('be.visible');
    cy.contains('span', 'There was an error processing your request. Please try again later.').should('be.visible');
    cy.contains('button', 'Back to home').should('be.visible');
  });

  it('returns to home from error message', () => {
    cy.intercept('GET', '**/api/people/details/1', {
      statusCode: 500,
      body: { detail: 'Not Found' },
    }).as('peopleDetailsError');

    cy.visit('/people/1');
    cy.wait('@peopleDetailsError');

    cy.contains('button', 'Back to home').click();
    cy.location('pathname').should('eq', '/');
  });
});
