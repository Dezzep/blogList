describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});
describe('Blog app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('UserName');
    cy.contains('Password');
  });
  it('user can log in', function () {
    cy.get('#username').type('Susan');
    cy.get('#password').type('badApple');
    cy.get('#login-button').click();

    cy.contains('Susan Ofcourse logged in');
  });
});
describe('New blog can be added', function () {
  it('creates a new blog', function () {
    cy.get('#newblog').click();
    cy.get('#title').type('susans cool new blog');
    cy.get('#author').type('Susan Ofcourse');
    cy.get('#url').type('www.susanscoolblogs.susan.com');

    cy.get('#submit').click();
    cy.contains('susans cool new blog');
  });
});
describe('blog can be removed', function () {
  it('blog is removed after remove is clicked', function () {
    cy.get('#deletethis').click();
  });
});
describe('blog with most likes is displayed first', function () {
  it('Leeroy is first when liked', function () {
    cy.get('#viewId0').click();
    cy.get('#likeId0').click();

    cy.get('.blog').eq(0).should('contain', 'Leeroy');
  });
});
