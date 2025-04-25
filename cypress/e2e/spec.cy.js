const random = Math.floor(Math.random() * 100000)
const username = `fake${random}`
const email = `fake${random}@email.com`
const password = '1hstesh<23456789'

describe('Create and connect to an account', () => {
  it('Visits the OC commerce site and creates an account', () => {
    cy.visit('/home')

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

    cy.get('[id^=your_name]').type(username)
    cy.get('[id^=your_pass]').type(password)
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')
    cy.contains('FAVOURITE')
  })
})

describe('Put item in favourite', () => {
  it('Connect to OC commerce and manage favourite products', () => {
    
    cy.visit('/home')
    cy.contains('LOGIN').click()
    cy.url().should('include', '/user/login')

    cy.get('[id^=your_name]').type(username)
    cy.get('[id^=your_pass]').type(password)
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')
    cy.contains('FAVOURITE')

    cy.contains('FAVOURITE').click()
    cy.url().should('include', '/favourite')
    cy.contains('No Product in your favourite list').should('exist')

    cy.visit('/home')

    cy.get('[id^=favBtn]').first().click()

    cy.contains('FAVOURITE').click()
    cy.url().should('include', '/favourite')
    cy.get('table tbody tr').should('have.length.at.least', 1)

    cy.get('[id^=favBtn]').first().click()

    cy.reload()
    cy.contains('No Product in your favourite list').should('exist')
  })
})

describe('Dark Mode Toggle Button', () => {
  it('should toggle dark and light themes and persist preference', () => {
    cy.visit('/home')

    cy.get('#theme-toggle').should('exist').and('be.visible')

    cy.get('body').should('not.have.class', 'bg-dark')

    cy.get('#theme-toggle').click()

    cy.get('body').should('have.class', 'bg-dark')
    cy.get('body').should('have.class', 'text-white')

    cy.reload()
    cy.get('body').should('have.class', 'bg-dark')
    cy.get('body').should('have.class', 'text-white')

    cy.get('#theme-toggle').click()
    cy.get('body').should('not.have.class', 'bg-dark')
  })
})

