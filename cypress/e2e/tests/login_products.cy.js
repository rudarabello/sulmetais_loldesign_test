import { faker } from '@faker-js/faker';

describe(' Make login with known data ', () => {
    const login = {
        name: 'Walmir',
        email: 'walmir.lucena@loldesign.com.br',
        senha: 'walmirAdmin123',
    };
    const product = {
        category: faker.name.firstName(),
        name: faker.name.firstName(),
    };

    it('Should make login with data sent by Floriza', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/');
        cy.get("input[type='email']").type(login.email);
        cy.get("input[type='password']").type(login.senha);
        cy.intercept('POST', 'https://sulmetais-api-prod.loldesign.com.br/api/login').as('newLogin');
        cy.contains('Entrar').click();
        cy.wait('@newLogin', { timeout: 15000 });
        cy.contains('Olá');
    });

    it('Should enter on products and generate pdf', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/');
        cy.get("input[type='email']").type(login.email);
        cy.get("input[type='password']").type(login.senha);
        cy.intercept('POST', 'https://sulmetais-api-prod.loldesign.com.br/api/login').as('newLogin');
        cy.contains('Entrar').click();
        cy.wait('@newLogin', { timeout: 15000 });
        cy.contains('Olá');
        cy.intercept('GET', '	https://sulmetais-web-prod.loldesign.com.br/_next/static/chunks/pages/admin/products.js').as('Products');
        cy.contains('Produtos').click();
        cy.wait('@Products', { timeout: 15000 });
        cy.get('tbody').within(() => {
            cy.get('tr').first().click();
        });
        cy.wait(5000);
        cy.get('.modal-footer').within(() => {
            cy.get('button').first().click();
        });
    });

    it('Should add a fake category', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/');
        cy.get("input[type='email']").type(login.email);
        cy.get("input[type='password']").type(login.senha);
        cy.intercept('POST', 'https://sulmetais-api-prod.loldesign.com.br/api/login').as('newLogin');
        cy.contains('Entrar').click();
        cy.wait('@newLogin', { timeout: 15000 });
        cy.contains('Olá');
        cy.intercept('GET', '	https://sulmetais-web-prod.loldesign.com.br/_next/static/chunks/pages/admin/products.js').as('Products');
        cy.contains('Produtos').click();
        cy.wait('@Products', { timeout: 15000 });
        cy.wait(5000);
        cy.get('button').should('contain', 'Adicionar').last().click();
        cy.get('.modal-body').within(() => {
            cy.get("input[type='text']").type(product.category);
        });
        cy.get("button[type='submit']").first().click();
    });

    it('Should add a fake product', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/');
        cy.get("input[type='email']").type(login.email);
        cy.get("input[type='password']").type(login.senha);
        cy.intercept('POST', 'https://sulmetais-api-prod.loldesign.com.br/api/login').as('newLogin');
        cy.contains('Entrar').click();
        cy.wait('@newLogin', { timeout: 15000 });
        cy.contains('Olá');
        cy.intercept('GET', '	https://sulmetais-web-prod.loldesign.com.br/_next/static/chunks/pages/admin/products.js').as('Products');
        cy.contains('Produtos').click();
        cy.wait('@Products', { timeout: 15000 });
        cy.wait(5000);
        cy.get('button').should('contain', 'Adicionar').first().click();
        cy.get('.modal-body').within(() => {
            cy.get("input[type='text']").type(product.name);
        });
        cy.get('.modal-body').within(() => {
            cy.get("button[type='button']").first().click();
        });
        //Due to the category combox not working
        //it was not possible to do the full test in this modal
    });
});
