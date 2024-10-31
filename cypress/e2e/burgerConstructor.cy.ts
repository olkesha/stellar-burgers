import cypress from 'cypress';
import { setCookie, deleteCookie } from '../../src/utils/cookie';

describe('работа с ингредиентами и конструктором', () => {
  
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  })

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
  
  it('проверка модального окна с деталями ингредиента', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#modals').contains("Детали ингредиента").should('not.exist');
    cy.get('h3').contains('Начинки').next('ul').find('li').first().click();
    cy.get('#modals').contains("Детали ингредиента").should('exist');
    cy.get('h3').contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get('#modals').find('button').click();
    cy.get('#modals').contains("Детали ингредиента").should('not.exist');
  })

  it('проверка добаления ингредиента в конструктор', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h3').contains('Булки').next('ul').should('exist');
    cy.get('h3').contains('Булки').next('ul').find('li').eq(0).contains('Добавить').click();
    cy.get('h3').contains('Булки').next('ul').find('li').eq(0).contains('2');

    cy.get('h3').contains('Начинки').next('ul').should('exist');
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('Добавить').click();
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('1');
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(0).contains('Добавить').click();
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(0).contains('1');

    cy.get('h3').contains('Соусы').next('ul').should('exist');
    cy.get('h3').contains('Соусы').next('ul').find('li').eq(0).contains('Добавить').click();
    cy.get('h3').contains('Соусы').next('ul').find('li').eq(0).contains('1');
  })

  it('проверка оформления заказа с модальным окном', () => {
    cy.visit('http://localhost:3000/');
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTQ5NDUzZDgyOWJlMDAxYzc3NzI2NiIsImlhdCI6MTczMDM1OTMzOCwiZXhwIjoxNzMwMzYwNTM4fQ.xJtuI2BEFbPcFDLB_ln_UkIJluk7gezH2NML8jykZGo');
    localStorage.setItem('refreshToken', '9f66755c60d45f8b6e7571d2d80565e573d1e834021f7e16ed67910777c6f22159bd018f0ecdce3f');
    cy.get('h3').contains('Булки').next('ul').should('exist');
    cy.get('h3').contains('Булки').next('ul').find('li').eq(0).contains('Добавить').click();
    cy.get('div').contains('Выберите булки').should('not.exist');

    cy.get('h3').contains('Начинки').next('ul').should('exist');
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('Добавить').click();
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(1).contains('1');
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(0).contains('Добавить').click();
    cy.get('h3').contains('Начинки').next('ul').find('li').eq(0).contains('1');
    cy.get('h3').contains('Соусы').next('ul').should('exist');
    cy.get('h3').contains('Соусы').next('ul').find('li').eq(0).contains('Добавить').click();
    cy.get('h3').contains('Соусы').next('ul').find('li').eq(0).contains('1');
    cy.get('div').contains('Выберите начинку').should('not.exist');

    cy.get('div').contains('Оформить заказ').click();
    cy.get('#modals').should('exist');
    cy.get('#modals').contains('идентификатор заказа').should('exist');
    cy.get('h2').contains('58212').should('exist');
    cy.get('#modals').find('button').click();
    cy.get('#modals').contains('идентификатор заказа').should('not.exist');
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('div').contains('Выберите начинку').should('exist');
  })

})