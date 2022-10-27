describe(' Make login with known data ', () => {
    const login = {
        name: 'Walmir',
        email: 'walmir.lucena@loldesign.com.br',
        senha: 'walmirAdmin123',
    };

    it('Should be make login with data sent by Floriza', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/');
        cy.get("input[type='email']").type(login.email);
        cy.get("input[type='password']").type(login.senha);
        cy.intercept('POST', 'https://sulmetais-api-prod.loldesign.com.br/api/login').as('newLogin');
        cy.contains('Entrar').click();
        cy.wait('@newLogin', { timeout: 15000 });
        cy.wait(5000);
        cy.contains('Olá');
    });

    it('Should be enter on Users', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/');
        cy.get("input[type='email']").type(login.email);
        cy.get("input[type='password']").type(login.senha);
        cy.intercept('POST', 'https://sulmetais-api-prod.loldesign.com.br/api/login').as('newLogin');
        cy.contains('Entrar').click();
        cy.wait('@newLogin', { timeout: 15000 });
        cy.contains('Olá');
        cy.intercept('GET', 'https://sulmetais-web-prod.loldesign.com.br/_next/static/chunks/pages/admin/users.js').as('Users');
        cy.contains('Usuários').click();
        cy.wait('@Users', { timeout: 15000 });
        cy.contains('Olá');
    });

    it('Should be edit status of user ', () => {
        cy.visit('https://sulmetais-web-prod.loldesign.com.br/');
        cy.get("input[type='email']").type(login.email);
        cy.get("input[type='password']").type(login.senha);
        cy.intercept('POST', 'https://sulmetais-api-prod.loldesign.com.br/api/login').as('newLogin');
        cy.contains('Entrar').click();
        cy.wait('@newLogin', { timeout: 15000 });
        cy.contains('Olá');
        cy.intercept('GET', 'https://sulmetais-web-prod.loldesign.com.br/_next/static/chunks/pages/admin/users.js').as('Users');
        cy.contains('Usuários').click();
        cy.wait('@Users', { timeout: 15000 });
        cy.get('tbody').within(() => {
            cy.get('td').contains('Editar').first().click();
        });
        cy.wait(5000);
        cy.get("button[type='button']").first().click(0, 60, { force: true });
    });
});
