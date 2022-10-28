import { faker } from '@faker-js/faker';
import cnpj from './factory/generateCnpj.js';

describe(' Make sign-up with unknown data ', () => {
    const signUp = {
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        enterprise: faker.name.firstName(),
        cnpj: cnpj(),
        city: faker.name.firstName(),
        password: faker.internet.password(),
    };

    it('Should be enter on register and fill all fields', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/auth/login');
        cy.get('form').within(() => {
            cy.get('button').first().click();
        });
        cy.wait(3000);
        cy.get('form').within(() => {
            cy.get('#validationServer01').type(signUp.name);
        });
        cy.get('form').within(() => {
            cy.get('#validationServer02').type(signUp.phone);
        });
        cy.get('form').within(() => {
            cy.get('#validationServer03').type(signUp.email);
        });
        cy.get('form').within(() => {
            cy.get('#validationServer04').type(signUp.enterprise);
        });
        cy.get('form').within(() => {
            cy.get('input[placeholder="CPF/CNPJ"]').type(signUp.cnpj);
        });
        cy.get('form').within(() => {
            cy.get('select').select('São Paulo');
        });
        cy.get('form').within(() => {
            cy.get('input[placeholder="Cidade"]').type(signUp.city);
        });
        cy.get('form')
            .last()
            .within(() => {
                cy.get("input[type='password']").first().type(signUp.password, { force: true });
            });
        cy.get('form').within(() => {
            cy.get("input[type='password']").last().type(signUp.password);
        });
        cy.get('form').within(() => {
            cy.get("button[type='submit']").last().click();
        });
    });
});
