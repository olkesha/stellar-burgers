import cypress from 'cypress'

describe('доступность приложения', () => {
  it('должен открывать сайт по адресу localhost:3000', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
  })
})