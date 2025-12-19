describe('Home page', () => {
  const peopleResult = {
    results: [
      {
        name: 'Luke Skywalker',
        url: 'https://localhost:8000/api/people/1/',
      },
    ],
  };

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

  const movieResult = {
    results: [
      {
        title: 'A New Hope',
        url: 'https://localhost:8000/api/movies/1/',
      },
    ],
  };

  const movieDetails = {
    title: 'A New Hope',
    opening_crawl: 'It is a period of civil war. Rebel spaceships.',
    characters_details: [{ id: 1, name: 'Luke Skywalker' }],
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the initial UI state', () => {
    cy.contains('h2', 'What are you searching for?').should('be.visible');
    cy.get('input[type="radio"][value="people"]').should('be.checked');
    cy.get('input[placeholder="e.g. Chewbacca, Yoda, Boba Fett"]').should('exist');
    cy.contains('button', 'SEARCH').should('be.disabled');
    cy.contains('p', 'There are zero matches.').should('be.visible');
    cy.contains('p', 'Use the form to search for People or Movies.').should('be.visible');
  });

  it('switches to movies and updates placeholder', () => {
    cy.get('input[type="radio"][value="movies"]').check({ force: true });
    cy.get('input[placeholder="e.g. Star Wars, The Empire Strikes Back"]').should('exist');
    cy.contains('button', 'SEARCH').should('be.disabled');
  });

  it('searches people and navigates to details', () => {
    cy.intercept('GET', '**/api/people*', {
      statusCode: 200,
      body: peopleResult,
    }).as('searchPeople');

    cy.intercept('GET', '**/api/people/details/*', {
      statusCode: 200,
      body: peopleDetails,
    }).as('peopleDetails');

    cy.get('input[placeholder="e.g. Chewbacca, Yoda, Boba Fett"]').type('luke');
    cy.contains('button', 'SEARCH').click();

    cy.wait('@searchPeople');
    cy.contains('li', 'Luke Skywalker').should('be.visible');
    cy.contains('button', 'SEE DETAILS').click();

    cy.wait('@peopleDetails');
    cy.location('pathname').should('eq', '/people/1');
    cy.contains('h1', 'Luke Skywalker').should('be.visible');
  });

  it('searches movies and navigates to details', () => {
    cy.get('input[type="radio"][value="movies"]').check({ force: true });

    cy.intercept('GET', '**/api/movies*', {
      statusCode: 200,
      body: movieResult,
    }).as('searchMovies');

    cy.intercept('GET', '**/api/movies/details/*', {
      statusCode: 200,
      body: movieDetails,
    }).as('movieDetails');

    cy.get('input[placeholder="e.g. Star Wars, The Empire Strikes Back"]').type('hope');
    cy.contains('button', 'SEARCH').click();

    cy.wait('@searchMovies');
    cy.contains('li', 'A New Hope').should('be.visible');
    cy.contains('button', 'SEE DETAILS').click();

    cy.wait('@movieDetails');
    cy.location('pathname').should('eq', '/movie/1');
    cy.contains('h1', 'A New Hope').should('be.visible');
  });
});
