const random = Math.floor(Math.random() * 100000)
const username = `fake${random}`
const email = `fake${random}@email.com`
const password = '1hstesh<23456789'

describe('Create and connect to an account', () => {
  it('Visits the OC commerce site and creates an account', () => {
    cy.visit('/home')

    // Création de compte
    cy.contains('SIGNUP').click()
    cy.url().should('include', '/user/signup')

    cy.get('[id^=fname]').type('fakeuser')
    cy.get('[id^=lname]').type('toto')
    cy.get('[id^=username]').type(username)
    cy.get('[id^=email]').type(email)
    cy.get('[id^=pass]').type(password)
    cy.get('[id^=re_pass]').type(password)
    cy.get('form').contains('Register').click()
    cy.url().should('include', '/user/login')

    // Connexion
    cy.get('[id^=your_name]').type(username)
    cy.get('[id^=your_pass]').type(password)
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')
    cy.contains('FAVOURITE')
  })
})

describe('Put item in favourite', () => {
  it('Connect to OC commerce and manage favourite products', () => {
    // Connexion
    cy.visit('/home')
    cy.contains('LOGIN').click()
    cy.url().should('include', '/user/login')

    cy.get('[id^=your_name]').type(username)
    cy.get('[id^=your_pass]').type(password)
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')
    cy.contains('FAVOURITE')

    // Aller dans la page FAVOURITE et vérifier qu’elle est vide
    cy.contains('FAVOURITE').click()
    cy.url().should('include', '/favourite')
    cy.contains('No Product in your favourite list').should('exist')

    // Revenir à l'accueil
    cy.visit('/home')

    // Ajouter un produit aux favoris
    cy.get('[id^=favBtn]').first().click()

    // Vérifier qu’il est bien dans les favoris
    cy.contains('FAVOURITE').click()
    cy.url().should('include', '/favourite')
    cy.get('table tbody tr').should('have.length.at.least', 1)

    // Supprimer le produit
    cy.get('[id^=favBtn]').first().click()

    // Vérifier que la liste est vide
    cy.reload()
    cy.contains('No Product in your favourite list').should('exist')
  })
})

describe('Dark Mode Toggle Button', () => {
  it('should toggle dark and light themes and persist preference', () => {
    cy.visit('/home')

    // Vérifie que le bouton existe
    cy.get('#theme-toggle').should('exist').and('be.visible')

    // Vérifie que le mode clair est actif au départ
    cy.get('body').should('not.have.class', 'bg-dark')

    // Clique sur le bouton pour activer le mode sombre
    cy.get('#theme-toggle').click()

    // Vérifie que le mode sombre est activé
    cy.get('body').should('have.class', 'bg-dark')
    cy.get('body').should('have.class', 'text-white')

    // Recharge la page et vérifie que le mode sombre est conservé
    cy.reload()
    cy.get('body').should('have.class', 'bg-dark')
    cy.get('body').should('have.class', 'text-white')

    // Rebasculer en mode clair
    cy.get('#theme-toggle').click()
    cy.get('body').should('not.have.class', 'bg-dark')
  })
})

