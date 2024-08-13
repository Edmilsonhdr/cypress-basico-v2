/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit("../../../src/index.html");
});

describe("Central de Atendimento ao Cliente TAT", function () {
  it("verifica o título da aplicação", function () {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, ";
    cy.get("#firstName").type("Edmilson");
    cy.get("#lastName").type("Henrique");
    cy.get("#email").type("edmilsonhdr210@yahoo.com.br");
    cy.get("#phone").type(998542563);
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get(".button").click();
    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    const longText =
      "TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, ";
    cy.get("#firstName").type("Edmilson");
    cy.get("#lastName").type("Henrique");
    cy.get("#email").type("edmilsonhdr.com");
    cy.get("#phone").type(998542563);
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Edmilson")
      .should("have.value", "Edmilson")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Henrique")
      .should("have.value", "Henrique")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("edmilsonhdr210@yahoo.com.br")
      .should("have.value", "edmilsonhdr210@yahoo.com.br")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type(998542563)
      .should("have.value", 998542563)
      .clear()
      .should("have.value", "");
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });
  it.only("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
});
