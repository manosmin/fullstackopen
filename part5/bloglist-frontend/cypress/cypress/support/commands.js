Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users/login`, {
    username,
    password,
  }).then((response) => {
    localStorage.setItem("username", JSON.stringify(response.body.username));
    localStorage.setItem("token", JSON.stringify(response.body.token));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  cy.visit("");
});
