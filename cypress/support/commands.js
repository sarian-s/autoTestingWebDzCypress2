Cypress.Commands.add("error", (loginButtonSelector, errorMessage) => {
  cy.contains(loginButtonSelector).click();
  cy.contains(errorMessage).should("be.visible");
});
