describe('Movie view', () => {
	const movieDetails = {
		title: 'A New Hope',
		opening_crawl: 'It is a period of civil war. Rebel spaceships.',
		characters_details: [{ id: 1, name: 'Luke Skywalker' }],
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

	beforeEach(() => {
		cy.intercept('GET', '**/api/movies/details/1', {
			statusCode: 200,
			body: movieDetails,
			delay: 100,
		}).as('movieDetails');
	});

	it('renders movie details and opening crawl', () => {
		cy.visit('/movie/1');

		cy.contains('Loading...').should('be.visible');
		cy.wait('@movieDetails');

		cy.contains('h1', 'A New Hope').should('be.visible');
		cy.contains('h2', 'Opening Crawl').should('be.visible');
		cy.contains('p', 'It is a period of civil war').should('be.visible');

		cy.contains('h2', 'Characters').should('be.visible');
		cy.contains('a', 'Luke Skywalker').should('be.visible');
	});

	it('navigates to character details when a character is clicked', () => {
		cy.intercept('GET', '**/api/people/details/1', {
			statusCode: 200,
			body: peopleDetails,
		}).as('peopleDetails');

		cy.visit('/movie/1');
		cy.wait('@movieDetails');

		cy.contains('a', 'Luke Skywalker').click();
		cy.wait('@peopleDetails');

		cy.location('pathname').should('eq', '/people/1');
		cy.contains('h1', 'Luke Skywalker').should('be.visible');
	});

	it('returns to home when clicking back', () => {
		cy.visit('/movie/1');
		cy.wait('@movieDetails');

		cy.contains('button', 'BACK TO SEARCH').click();
		cy.location('pathname').should('eq', '/');
	});

	it('shows error message when details are not found', () => {
		cy.intercept('GET', '**/api/movies/details/1', {
			statusCode: 500,
			body: { detail: 'Not Found' },
		}).as('movieDetailsError');

		cy.visit('/movie/1');
		cy.wait('@movieDetailsError');

		cy.contains('strong', 'Error!').should('be.visible');
		cy.contains('span', 'There was an error processing your request. Please try again later.').should('be.visible');
		cy.contains('button', 'Back to home').should('be.visible');
	});

	it('returns to home from error message', () => {
		cy.intercept('GET', '**/api/movies/details/1', {
			statusCode: 500,
			body: { detail: 'Not Found' },
		}).as('movieDetailsError');

		cy.visit('/movie/1');
		cy.wait('@movieDetailsError');

		cy.contains('button', 'Back to home').click();
		cy.location('pathname').should('eq', '/');
	});
});
