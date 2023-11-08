import dataTests from "../fixtures/credentials.json";
import seats from "../fixtures/seats.json";

describe("main page", () => {
  it("should open main page", () => {
    cy.visit("/");
    cy.get(dataTests.selectors.email).type(dataTests.validEmail);
    cy.get(dataTests.selectors.password).type(dataTests.validPassword);
    cy.contains(dataTests.selectors.loginButton).click();
    cy.get(dataTests.selectors.hallNames).should("have.length", 7);

    const hallNamesText = {};

    cy.get(dataTests.selectors.hallNames)
      .each(($el, index) => {
        hallNamesText[`hall${index + 1}`] = $el.text();
      })
      .then(() => {
        cy.writeFile("cypress/fixtures/hallNames.json", hallNamesText);
      });

    cy.visit("http://qamid.tmweb.ru/");
    cy.get(dataTests.selectors.days).should("have.length", 7);
    cy.get(dataTests.selectors.days).eq(1).click();
    cy.get(dataTests.selectors.movie).last().contains("16:00").click();

    cy.fixture("hallNames").then((halls) => {
      cy.get(dataTests.selectors.buyingHall)
        .contains(halls.hall2)
        .should("be.visible");
    });

    seats.forEach((booking) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${booking.row}) > :nth-child(${booking.seat})`
      ).click();
    });
  });
});
