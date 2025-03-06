import { LoginComponent } from "../src/app/components/login/login.component"




describe('Prueba Email', () => {
  it('Comprobamos que no valga cualquier email', () => {
    cy.mount(LoginComponent)

    cy.get('#email').type('homer.simpson@gmail.com') // Type 'Hello, World' into the 'input'
    cy.get('#password').type('1234567890')

    cy.get('#image-color').click()


  })
})

describe('Prueba Contraseña', () => {
  it('playground', () => {
    cy.mount(LoginComponent)

    cy.get('#password').type('Hello, World') // Type 'Hello, World' into the 'input'


  })
})