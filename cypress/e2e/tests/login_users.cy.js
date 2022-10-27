describe(' Make login with known data ', { execTimeout: 90000 }, () => {
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
        cy.contains('Olá');
    });

    it('Should be enter on products', () => {
        cy.intercept('GET', '	https://sulmetais-web-prod.loldesign.com.br/_next/static/chunks/pages/admin/products.js').as('Products');
        cy.contains('Usuários').click();
        cy.wait('@Products', { timeout: 15000 });
        cy.get('.g-sidenav-show g-sidenav-pinned color').get('.data-nextjs-dialog-overlay').get('.button').click();
        cy.contains('unhandled error', { timeout: 15000 });
    });
});
